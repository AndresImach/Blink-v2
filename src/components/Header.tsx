import React from 'react';
import { CreditCard, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Bank Benefits Finder
        </h1>
        <Sparkles className="h-6 w-6 text-yellow-500" />
      </div>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Discover the best rewards and benefits for your favorite businesses across different bank cards.
        Compare and maximize your earnings effortlessly.
      </p>
    </div>
  );
};