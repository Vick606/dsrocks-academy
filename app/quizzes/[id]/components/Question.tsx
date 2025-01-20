'use client';

import { useState } from 'react';

export function Question({ question, questionNumber, onAnswerSelect }: { 
  question: any; 
  questionNumber: number; 
  onAnswerSelect: (answer: string) => void; 
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === question.correct_answer);
    onAnswerSelect(answer);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black">
      <h3 className="text-xl font-bold mb-4">Question {questionNumber}: {question.text}</h3>
      <div className="space-y-2">
        {question.answers.map((answer: string, index: number) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(answer)}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              selectedAnswer === answer
                ? isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {answer}
          </button>
        ))}
      </div>
      {selectedAnswer && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Explanation: {question.explanation}</p>
        </div>
      )}
    </div>
  );
}