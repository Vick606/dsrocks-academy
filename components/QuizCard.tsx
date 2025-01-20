export function QuizCard({ quiz }: { quiz: any }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
        <p className="text-gray-600 mb-4">{quiz.description}</p>
        <a href={`/quizzes/${quiz.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Start Quiz
        </a>
      </div>
    );
  }