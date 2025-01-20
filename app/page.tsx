import { QuizCard } from "@/components/QuizCard";
import { fetchFeaturedQuizzes } from "@/utils/fetchQuizzes";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";

export default async function Home() {
  const featuredQuizzes = await fetchFeaturedQuizzes();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">Master Data Science with Well-Curated Quizzes</h1>
          <p className="text-xl mb-8">Learn SQL, Python, and more through interactive quizzes.</p>
          <div className="space-x-4">
            <a href="/categories" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Explore Quizzes
            </a>
            <a href="/sign-up" className="bg-transparent border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Sign Up
            </a>
          </div>
        </div>

        {/* Featured Quizzes */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">Featured Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </div>

      {/* Template Content */}
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
      </main>
    </>
  );
}