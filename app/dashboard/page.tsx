import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchUserProgress } from "@/utils/fetchQuizzes";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect to login if user is not signed in
  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user progress
  const userProgress = await fetchUserProgress(user.id);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-center">Dashboard</h1>

        {/* Completed Quizzes */}
        <div className="bg-white p-6 rounded-lg shadow-md text-black mb-8">
          <h2 className="text-2xl font-bold mb-4">Completed Quizzes</h2>
          {userProgress.completedQuizzes.length > 0 ? (
            <ul className="space-y-2">
              {userProgress.completedQuizzes.map((quiz: any) => (
                <li key={quiz.id} className="flex justify-between items-center">
                  <span>{quiz.title}</span>
                  <span className="font-bold">Score: {quiz.score}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No quizzes completed yet.</p>
          )}
        </div>

        {/* Incomplete Quizzes */}
        <div className="bg-white p-6 rounded-lg shadow-md text-black mb-8">
          <h2 className="text-2xl font-bold mb-4">Incomplete Quizzes</h2>
          {userProgress.incompleteQuizzes.length > 0 ? (
            <ul className="space-y-2">
              {userProgress.incompleteQuizzes.map((quiz: any) => (
                <li key={quiz.id} className="flex justify-between items-center">
                  <span>{quiz.title}</span>
                  <a
                    href={`/quizzes/${quiz.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Resume
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No incomplete quizzes.</p>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-white p-6 rounded-lg shadow-md text-black">
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          {userProgress.achievements.length > 0 ? (
            <ul className="space-y-2">
              {userProgress.achievements.map((achievement: any) => (
                <li key={achievement.id} className="flex items-center gap-2">
                  <span className="font-bold">{achievement.title}</span>
                  <span>{achievement.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No achievements yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}