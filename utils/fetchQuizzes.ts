import { createClient } from '../utils/supabase/client';

export async function fetchFeaturedQuizzes() {
  const supabase = createClient();
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