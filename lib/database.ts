import { createSupabaseClient } from "./supabase";

// Static function - no auth needed
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

// Static function - no auth needed
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

// Static function - no auth needed for recent sessions
export const getRecentSessions = async (limit: number = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('session_history')
    .select('companions:companion_id(*)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    return { error: error.message || 'Failed to get recent sessions' };
  }

  return data.map(({ companions }) => companions);
} 