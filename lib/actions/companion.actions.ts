'use server'

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  if (!author) {
    return { error: "Unauthorized" };
  }
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .insert({
        ...formData,
        author
    })
    .select();

  if (error) {
    return { error: error.message || 'Failed to create companion' };
  }

  return data[0];
}

export const getAllCompanions = async (params: GetAllCompanions) => {
    const {
        limit = 10,
        page = 1,
        subject,
        topic,
    } = params;

    const supabase = createSupabaseClient();

    let query = supabase
        .from('companions')
        .select()

    if (subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`)
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if (error) {
      return { error: error.message || 'Failed to get companions' };
    }

    const total = companions?.length || 0;
    const totalPages = Math.ceil(total / limit);

    return {
        companions,
        total,
        totalPages,
    };
}

export const getCompanionDetails = async (companionId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('id', companionId);

  if (error) {
    return { error: error.message || 'Failed to get companion details' };
  }

  return data[0];
}

export const addToSessionHistory = async (companionId: string) => {
  const supabase = createSupabaseClient();
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from('session_history')
    .insert({
      companion_id: companionId,
      user_id: userId,
    })

  if (error) {
    return { error: error.message || 'Failed to add to session history' };
  }

  return data;
}

export const getRecentSessions = async (limit: number = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('session_history')
    .select('companions:companion_id(*)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
}

export const getUserSessions = async (userId: string, limit: number = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('session_history')
    .select('companions:companion_id(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    return { error: error.message || 'Failed to get user sessions' };
  }

  return data.map(({ companions }) => companions);
}

export const getUserCreatedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .select('*')
    .eq('author', userId);

  if (error) {
    return { error: error.message || 'Failed to get user created companions' };
  }

  return data || [];
}

export const checkIfUserCanCreateCompanion = async () => {
  const supabase = createSupabaseClient();
  const { userId, has } = await auth();
  let limit = 0;

  if (!userId) {
    throw new Error('Unauthorized');
  }

  if (has({plan: 'pro'})) {
    return true;
  } else if (has({feature: '3_active_companions'})) {
    limit = 2;
  } else if (has({feature: '10_active_companions'})) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from('companions')
    .select('id', { count: 'exact' })
    .eq('author', userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length || 0;
  if (companionCount >= limit) {
    return false;
  }

  return true;
}
