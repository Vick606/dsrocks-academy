import { createSupabaseClient } from '@/utils/supabase/client';
import { fetchQuizById } from '@/utils/fetchQuiz';
import { Question } from '@/components/Question';
import { redirect } from 'next/navigation';

export default async function QuizPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect to login if user is not signed in
  if (!user) {
    redirect('/login');
  }

  const quiz = await fetchQuizById(params.id);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-center">{quiz.title}</h1>
        <div className="space-y-8">
          {quiz.questions.map((question, index) => (
            <Question key={question.id} question={question} questionNumber={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}