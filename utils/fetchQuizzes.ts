import { createSupabaseClient } from '@/utils/supabase/client';

export async function fetchUserProgress(userId: string) {
  const supabase = createSupabaseClient();

  // Fetch completed quizzes
  const { data: completedQuizzes, error: completedError } = await supabase
    .from('userprogress')
    .select('quiz_id, score, quizzes(title)')
    .eq('user_id', userId)
    .eq('is_completed', true);

  // Fetch incomplete quizzes
  const { data: incompleteQuizzes, error: incompleteError } = await supabase
    .from('userprogress')
    .select('quiz_id, quizzes(title)')
    .eq('user_id', userId)
    .eq('is_completed', false);

  // Fetch achievements
  const { data: achievements, error: achievementsError } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId);

  if (completedError || incompleteError || achievementsError) {
    console.error('Error fetching user progress:', completedError || incompleteError || achievementsError);
    return {
      completedQuizzes: [],
      incompleteQuizzes: [],
      achievements: [],
    };
  }

  return {
    completedQuizzes: completedQuizzes.map((row: any) => ({
      id: row.quiz_id,
      title: row.quizzes.title,
      score: row.score,
    })),
    incompleteQuizzes: incompleteQuizzes.map((row: any) => ({
      id: row.quiz_id,
      title: row.quizzes.title,
    })),
    achievements: achievements || [],
  };
}