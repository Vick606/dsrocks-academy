import { createSupabaseClient } from '@/utils/supabase/client';

// Fetch featured quizzes
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

// Fetch a single quiz by ID
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

// Fetch user progress
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