import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Search, Users, Trophy } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 rounded-lg p-6">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-3 bg-green-100 rounded-full">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="font-bold text-xl text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const InfoScouts = () => {
  const features = [
    {
      icon: Search,
      title: "Búsqueda Avanzada",
      description: "Filtra por posición, edad, altura, peso y más para encontrar a las jugadoras que buscas."
    },
    {
      icon: Star,
      title: "Perfiles Detallados",
      description: "Accede a videos e información detallada de cada jugadora en nuestra plataforma."
    },
    {
      icon: Users,
      title: "Red Profesional",
      description: "Conecta directamente con jugadoras"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full">
              <p className="text-green-600 font-medium text-sm">Plataforma para Scouts</p>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
              Descubre el Futuro del
              <span className="text-green-600"> Fútbol Femenino</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Conectamos scouts profesionales con el mejor talento emergente del fútbol colombiano.
              Únete a nuestra red y sé parte de la próxima generación de estrellas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <button className="group bg-green-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-green-500 transition-all duration-300 flex items-center gap-2">
                  Comenzar ahora
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
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <img
                className="w-full h-auto rounded-lg shadow-2xl object-cover"
                src="https://i.imgur.com/XMVMnWd.jpg"
                alt="Jugadora de fútbol en acción"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Todo lo que necesitas para descubrir talento
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas para optimizar tu proceso de búsqueda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-12 text-center space-y-6">
            <Trophy className="w-16 h-16 text-white/90 mx-auto" />
            <h2 className="text-4xl font-bold text-white">
              ¡Únete a la Promesas a la Cancha!
            </h2>
            <p className="text-xl text-white/90">
              No te pierdas la oportunidad de descubrir el próximo talento estrella.
            </p>
            <Link to="/register">
              <button className="bg-white text-green-600 px-8 py-4 my-2 rounded-lg font-semibold shadow-md hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                Regístrate ahora
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoScouts;