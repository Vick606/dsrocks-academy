import { createSupabaseClient } from './supabase/client';

export async function fetchCategoriesWithQuizzes() {
  const supabase = createSupabaseClient();

  // Fetch categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*');

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
    return [];
  }

  // Fetch quizzes for each category
  const categoriesWithQuizzes = await Promise.all(
    categories.map(async (category) => {
      const { data: quizzes, error: quizzesError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('category_id', category.id);

      if (quizzesError) {
        console.error('Error fetching quizzes:', quizzesError);
        return { ...category, quizzes: [] };
      }

      return { ...category, quizzes };
    }),
  );

  return categoriesWithQuizzes;
}