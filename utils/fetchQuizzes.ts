import { createSupabaseClient } from '@/utils/supabase/client';

export async function fetchFeaturedQuizzes() {
  const supabase = createSupabaseClient();
  const { data: quizzes, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('is_featured', true)
    .limit(3);

  if (error) {
    console.error('Error fetching quizzes:', error);
    return [];
  }

  return quizzes;
}

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