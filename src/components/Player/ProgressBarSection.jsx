import React, { useState } from 'react';
import { Award, Calculator } from 'lucide-react';
import axios from 'axios';

const ProgressBarSection = ({ playerInfo }) => {
  const [progressValue, setProgressValue] = useState(0);

  const calculatePercentage = async () => {
    const positionMap = {
      PO: 0, DFC: 1, LI: 2, LD: 2, MC: 3, 
      MCD: 4, MCO: 5, MI: 6, MD: 6, 
      EI: 6, ED: 6, SD: 7, DC: 7
    };

    const position = positionMap[playerInfo.natposition[0]] || 0;
    const yearsexp = playerInfo.yearsexp;
    const videoUploaded = playerInfo.videos.length > 0 ? 1 : 0;
    const foot = playerInfo.foot;
    const versatility = playerInfo.natposition.length > 1 ? 1 : 0;

    const payload = {
      email: playerInfo.email,
      position,
      height: playerInfo.height / 100,
      weight: playerInfo.weight,
      yearsexp,
      videoUploaded,
      ambidextrous: playerInfo.dominantFoot === "both" ? 1 : 0,
      foot,
      versatility,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/algorithm/assign-ranges`,
        payload
      );
      
      const percentage = response.data.puntaje || 0;
      setProgressValue(Math.round(percentage));
    } catch (error) {
      console.error("Error evaluating algorithm:", error);
      setProgressValue(0);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Award className="h-5 w-5 text-lime-600" />
        <h2 className="text-lg font-semibold">Porcentaje de Aceptación</h2>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <button 
          onClick={calculatePercentage}
          className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white text-sm px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <Calculator className="h-4 w-4" />
          Calcular Porcentaje
        </button>
      </div>
      <div className="bg-gray-100 rounded-full h-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-lime-400 to-lime-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
          style={{ width: `${progressValue}%` }}
        >
          <span className="text-xs font-medium text-white">{`${progressValue}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarSection;