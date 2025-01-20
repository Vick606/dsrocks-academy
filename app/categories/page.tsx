import { QuizCard } from '@/components/QuizCard';
import { fetchCategoriesWithQuizzes } from '@/utils/fetchCategories';

export default async function CategoriesPage() {
  const categoriesWithQuizzes = await fetchCategoriesWithQuizzes();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-center">Categories</h1>
        <div className="space-y-8">
          {categoriesWithQuizzes.map((category) => (
            <div key={category.id}>
              <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.quizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}