import React, { useState } from 'react';
import { Dices, Skull, Star, Flame } from 'lucide-react';

const VampireDiceCalculator = () => {
  const [diceCount, setDiceCount] = useState(5);
  const [difficulty, setDifficulty] = useState(6);

  // Calculates dice probabilities
  const calculateDiceProbabilities = () => {
    const totalCombinations = Math.pow(10, diceCount);
    let successCount = 0;
    let botchCount = 0;
    let averageSuccesses = 0;

    // Iterate through all possible dice combinations
    for (let i = 0; i < totalCombinations; i++) {
      let diceRolls = [];
      let tempNumber = i;

      // Generate dice rolls
      for (let j = 0; j < diceCount; j++) {
        diceRolls.push(tempNumber % 10 + 1);
        tempNumber = Math.floor(tempNumber / 10);
      }

      // Count successes and track botches
      const successfulRolls = diceRolls.filter(roll => roll >= difficulty).length;
      const oneRolls = diceRolls.filter(roll => roll === 1).length;
      
      // Check for botch (1s present, no successes)
      if (successfulRolls === 0 && oneRolls > 0) {
        botchCount++;
      }

      // Subtract 1s from successes
      const netSuccesses = Math.max(0, successfulRolls - oneRolls);
      averageSuccesses += netSuccesses;
      
      if (netSuccesses > 0) {
        successCount++;
      }
    }

    return {
      successProbability: (successCount / totalCombinations * 100).toFixed(2),
      failureProbability: ((totalCombinations - successCount - botchCount) / totalCombinations * 100).toFixed(2),
      botchProbability: (botchCount / totalCombinations * 100).toFixed(2),
      averageSuccesses: (averageSuccesses / totalCombinations).toFixed(2)
    };
  };

  const probabilities = calculateDiceProbabilities();

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6 font-gothic">
      <div className="max-w-2xl mx-auto bg-black/70 rounded-xl shadow-2xl border-2 border-red-900/50 p-6">
        <h1 className="text-4xl text-center text-red-600 mb-6 font-bold uppercase tracking-widest">
          Расчёт Вероятностей Дайсов VtM
        </h1>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <label className="block text-red-400 mb-2">Количество Дайсов</label>
            <div className="flex items-center">
              <button 
                onClick={() => setDiceCount(Math.max(1, diceCount - 1))}
                className="bg-red-800 text-white px-3 py-1 rounded"
              >
                -
              </button>
              <span className="mx-4 text-2xl">{diceCount}</span>
              <button 
                onClick={() => setDiceCount(diceCount + 1)}
                className="bg-red-800 text-white px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <label className="block text-red-400 mb-2">Сложность</label>
            <div className="flex items-center">
              <button 
                onClick={() => setDifficulty(Math.max(3, difficulty - 1))}
                className="bg-red-800 text-white px-3 py-1 rounded"
              >
                -
              </button>
              <span className="mx-4 text-2xl">{difficulty}</span>
              <button 
                onClick={() => setDifficulty(Math.min(10, difficulty + 1))}
                className="bg-red-800 text-white px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 flex items-center">
            <Star className="text-green-500 mr-3" />
            <div>
              <h3 className="text-red-400">Вероятность успеха</h3>
              <p>{probabilities.successProbability}%</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 flex items-center">
            <Dices className="text-yellow-500 mr-3" />
            <div>
              <h3 className="text-red-400">Среднее количество успехов</h3>
              <p>{probabilities.averageSuccesses}</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 flex items-center">
            <Skull className="text-red-500 mr-3" />
            <div>
              <h3 className="text-red-400">Вероятность неудачи</h3>
              <p>{probabilities.failureProbability}%</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 flex items-center">
            <Flame className="text-orange-500 mr-3" />
            <div>
              <h3 className="text-red-400">Вероятность ботча</h3>
              <p>{probabilities.botchProbability}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VampireDiceCalculator;