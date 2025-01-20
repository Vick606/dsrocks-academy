'use client';

import { createSupabaseClient } from '@/utils/supabase/client';
import { fetchQuizById } from '@/utils/fetchQuizzes';
import { Question } from '@/app/quizzes/[id]/components/Question';
import { Results } from '@/app/quizzes/[id]/components/Results';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function QuizPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseClient();
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      // Redirect to login if user is not signed in
      if (!user) {
        redirect('/login');
      }

      const quizData = await fetchQuizById(params.id);
      if (!quizData) {
        console.error('Quiz not found');
        return;
      }

      setQuiz(quizData);
      setUserAnswers(Array(quizData.questions.length).fill(''));
    };

    fetchQuizData();
  }, [params.id, supabase.auth]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-center">{quiz.title}</h1>
        <div className="space-y-8">
          {quiz.questions.map((question: any, index: number) => (
            <Question
              key={question.id}
              question={question}
              questionNumber={index + 1}
              onAnswerSelect={(answer) => handleAnswerSelect(index, answer)}
            />
          ))}
        </div>
        <Results questions={quiz.questions} userAnswers={userAnswers} />
      </div>
    </div>
  );
}