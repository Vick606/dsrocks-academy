import { createSupabaseClient } from '../utils/supabase/client';

export async function fetchQuizById(id: string) {
  const supabase = createSupabaseClient();
  const { data: quiz, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching quiz:', error);
    return null;
  }

  return quiz;
}