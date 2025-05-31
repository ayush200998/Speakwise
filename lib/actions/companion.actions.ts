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