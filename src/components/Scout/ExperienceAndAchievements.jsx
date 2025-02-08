import React from 'react';
import { Clock, Star, Trophy, Building, Calendar } from 'lucide-react';

const ExperienceCard = ({ experience }) => (
  <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-lime-500">
    <div className="flex items-center gap-2 mb-2">
      <Building className="h-5 w-5 text-lime-600" />
      <h4 className="font-semibold text-gray-900">{experience.club}</h4>
    </div>
    <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
      <Calendar className="h-4 w-4" />
      <span>
        {experience.startYear} - {experience.endYear || 'Presente'}
      </span>
    </div>
    {experience.description && (
      <p className="text-gray-700 text-sm mt-2">{experience.description}</p>
    )}
  </div>
);

const AchievementCard = ({ achievement }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'trophy':
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 'medal':
        return <Star className="h-5 w-5 text-blue-500" />;
      case 'star':
        return <Star className="h-5 w-5 text-purple-500" />;
      default:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
      <div className="flex items-center gap-2 mb-2">
        {getIcon(achievement.type)}
        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
      </div>
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <Calendar className="h-4 w-4" />
        <span>{achievement.year}</span>
      </div>
    </div>
  );
};

const ExperienceAndAchievements = ({ player }) => {
  return (
    <div className="mt-8 space-y-8">
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-lime-600" />
          Experiencia Deportiva
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {player.yearsexp.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </div>

      {player.achievements && player.achievements.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-lime-600" />
            Logros y Reconocimientos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {player.achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceAndAchievements;