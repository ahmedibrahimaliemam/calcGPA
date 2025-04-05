"use client";

import { useState } from 'react';

export default function CalcGPA() {
  const [subjectCount, setSubjectCount] = useState<number>(0);
  const [subjects, setSubjects] = useState<Array<{ grade: number }>>([]);
  const [gpa, setGPA] = useState<number>(0);

  const handleSubjectCount = (count: number) => {
    const validCount = Math.max(0, Math.min(10, count)); // Limit to 10 subjects
    setSubjectCount(validCount);
    setSubjects(Array(validCount).fill({ grade: 0 }));
  };

  const updateGrade = (index: number, grade: number) => {
    const validGrade = Math.max(0, Math.min(4, grade)); // Enforce 0-4 range
    setSubjects(prev => 
      prev.map((sub, i) => i === index ? { ...sub, grade: validGrade } : sub)
    );
  };

  const calculate = () => {
    if (subjectCount === 0) return;
    const total = subjects.reduce((sum, sub) => sum + sub.grade, 0);
    setGPA(total / subjectCount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🎓 College GPA Calculator
        </h1>
        
        <div className="mb-8">
          <label className="block text-gray-700 text-lg mb-3">
            Number of Subjects:
            <input
              type="number"
              min="0"
              max="10"
              value={subjectCount}
              onChange={(e) => handleSubjectCount(Number(e.target.value))}
              className="mt-2 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        {subjectCount > 0 && (
          <div className="space-y-4 mb-8">
            {[...Array(subjectCount)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Subject {i + 1}:</span>
                <input
                  type="number"
                  min="0"
                  max="4"
                  step="0.1"
                  onChange={(e) => updateGrade(i, Number(e.target.value))}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0-4"
                />
              </div>
            ))}
          </div>
        )}

        <button
          onClick={calculate}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold
                   hover:shadow-lg transition-all duration-300"
        >
          Calculate GPA
        </button>

        {gpa > 0 && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center animate-fade-in">
            <p className="text-xl font-semibold text-gray-800">
              Your GPA: <span className="text-2xl text-blue-600">{gpa.toFixed(2)}</span>
            </p>
            <div className="mt-2 h-2 bg-blue-200 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(gpa/4)*100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}