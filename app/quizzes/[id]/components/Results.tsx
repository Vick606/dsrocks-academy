export function Results({ questions, userAnswers }: { questions: any[]; userAnswers: string[] }) {
    const score = questions.reduce((acc, question, index) => {
      return acc + (userAnswers[index] === question.correct_answer ? 1 : 0);
    }, 0);
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-black">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="text-lg mb-4">Your score: {score} / {questions.length}</p>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id}>
              <p className="font-semibold">Question {index + 1}: {question.text}</p>
              <p className="text-sm text-gray-600">Your answer: {userAnswers[index]}</p>
              <p className="text-sm text-gray-600">Correct answer: {question.correct_answer}</p>
              <p className="text-sm text-gray-600">Explanation: {question.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }