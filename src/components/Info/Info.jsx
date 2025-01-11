import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Award } from "lucide-react";

const BenefitCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
    <div className="p-2 bg-green-100 rounded-lg">
      <Icon className="w-5 h-5 text-green-600" />
    </div>
    <div>
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const Info = () => {
  const benefits = [
    {
      icon: Star,
      title: "Visibilidad Profesional",
      description: "Conecta con reclutadores de toda la ciudad"
    },
    {
      icon: Shield,
      title: "Desarrollo Continuo",
      description: "Acceso a una evaluación personalizada de tus características de una red neuronal"
    },
    {
      icon: Award,
      title: "Muestra tu talento",
      description: "Sube tus videos y destaca tus habilidades en la plataforma"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contenido */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
                <Star className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-green-600 font-medium text-sm">Tu futuro en el fútbol</span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                Forma parte de la nueva generación del
                <span className="text-green-600"> fútbol femenino</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Únete a la comunidad de futbolistas donde podrás desarrollar tu talento,
                conectar con profesionales y acceder a oportunidades únicas para tu carrera deportiva.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <button className="group bg-green-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-green-500 transition-all duration-300 flex items-center gap-2">
                  Comienza ahora
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/about">
                <button className="px-8 py-4 rounded-lg font-semibold text-green-600 hover:bg-green-50 transition-all duration-300">
                  Conoce más
                </button>
              </Link>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <img
                className="w-full h-auto rounded-lg shadow-2xl object-cover"
                src="https://i.imgur.com/jjYGMSt.jpg"
                alt="Jugadora de fútbol en acción"
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;