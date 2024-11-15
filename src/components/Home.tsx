import React from 'react';
import { Brain, HeartPulse, Microscope, Stethoscope } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">AI in Healthcare</h1>
          <p className="text-xl text-gray-600">Transforming Patient Care Through Artificial Intelligence</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <Brain className="h-8 w-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Diagnostic Precision</h2>
            </div>
            <p className="text-gray-600">
              AI algorithms analyze medical images and patient data with unprecedented accuracy,
              helping doctors detect diseases earlier and make more accurate diagnoses.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <HeartPulse className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Personalized Treatment</h2>
            </div>
            <p className="text-gray-600">
              Machine learning models analyze patient data to recommend personalized treatment
              plans, improving outcomes and reducing adverse effects.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <Microscope className="h-8 w-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Drug Discovery</h2>
            </div>
            <p className="text-gray-600">
              AI accelerates drug discovery by analyzing molecular structures and predicting
              drug interactions, significantly reducing development time and costs.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <Stethoscope className="h-8 w-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Preventive Care</h2>
            </div>
            <p className="text-gray-600">
              Predictive analytics help identify health risks before they become serious,
              enabling proactive interventions and better preventive care strategies.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why AI Matters in Healthcare</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Artificial Intelligence is revolutionizing healthcare by processing vast amounts of medical data
              at unprecedented speeds. This capability enables healthcare providers to make more informed
              decisions, predict patient outcomes, and develop targeted treatment strategies.
            </p>
            <p className="mb-4">
              From early disease detection to drug development, AI technologies are improving efficiency,
              reducing costs, and most importantly, saving lives. Machine learning algorithms can identify
              patterns in medical images, genetic information, and electronic health records that might be
              missed by human observation alone.
            </p>
            <p>
              As healthcare systems worldwide face increasing demands, AI-powered solutions offer the
              potential to enhance care delivery while making healthcare more accessible and affordable
              for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;