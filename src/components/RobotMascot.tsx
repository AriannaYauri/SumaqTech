import React from 'react';

const RobotMascot: React.FC = () => {
  return (
    <div className="relative">
      {/* Robot Body */}
      <div className="w-48 h-64 mx-auto relative">
        {/* Head */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-gray-200 rounded-t-full border-4 border-gray-300">
          {/* Antennae */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gray-400 rounded-full">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full"></div>
          </div>
          
          {/* Eyes */}
          <div className="absolute top-6 left-3 w-5 h-5 bg-teal-400 rounded-full shadow-inner">
            <div className="absolute top-1 left-1 w-3 h-3 bg-teal-300 rounded-full"></div>
          </div>
          <div className="absolute top-6 right-3 w-5 h-5 bg-teal-400 rounded-full shadow-inner">
            <div className="absolute top-1 left-1 w-3 h-3 bg-teal-300 rounded-full"></div>
          </div>
          
          {/* Ears */}
          <div className="absolute top-3 -left-6 w-6 h-6 bg-gray-300 rounded-full border-2 border-gray-400"></div>
          <div className="absolute top-3 -right-6 w-6 h-6 bg-gray-300 rounded-full border-2 border-gray-400"></div>
        </div>
        
        {/* Body */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-white rounded-2xl border-4 border-gray-300 shadow-lg">
          {/* Chest Panel */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-100 rounded-xl border-2 border-gray-200">
            <div className="absolute top-2 left-2 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute top-2 right-2 w-4 h-4 bg-green-400 rounded-full"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gray-300 rounded-lg">
              <div className="absolute top-1 left-1 w-2 h-4 bg-gray-400 rounded-sm"></div>
              <div className="absolute top-1 left-4 w-2 h-4 bg-gray-400 rounded-sm"></div>
              <div className="absolute top-1 right-1 w-2 h-4 bg-gray-400 rounded-sm"></div>
            </div>
          </div>
        </div>
        
        {/* Arms */}
        <div className="absolute top-20 -left-6 w-6 h-16 bg-gray-200 rounded-full border-2 border-gray-300"></div>
        <div className="absolute top-20 -right-6 w-6 h-16 bg-gray-200 rounded-full border-2 border-gray-300"></div>
        
        {/* Legs */}
        <div className="absolute top-44 left-6 w-6 h-16 bg-gray-200 rounded-full border-2 border-gray-300"></div>
        <div className="absolute top-44 right-6 w-6 h-16 bg-gray-200 rounded-full border-2 border-gray-300"></div>
        
        {/* Feet */}
        <div className="absolute top-58 left-4 w-10 h-4 bg-gray-300 rounded-full border-2 border-gray-400"></div>
        <div className="absolute top-58 right-4 w-10 h-4 bg-gray-300 rounded-full border-2 border-gray-400"></div>
      </div>
    </div>
  );
};

export default RobotMascot;