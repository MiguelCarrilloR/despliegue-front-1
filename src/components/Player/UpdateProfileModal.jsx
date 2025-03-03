import React, { useState, useEffect } from "react";
import { PlusCircle, MinusCircle, Award, Calendar, Activity } from 'lucide-react';

const UpdateProfileModal = ({ open, handleClose, playerInfo, onSubmit }) => {
    const [updatedInfo, setUpdatedInfo] = useState({});
    const [positions, setPositions] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [yearsExperience, setYearsExperience] = useState([]);
    const [newAchievement, setNewAchievement] = useState({ title: "", type: "trophy", year: new Date().getFullYear() });
    const [newExperience, setNewExperience] = useState({ club: "", startYear: new Date().getFullYear() - 3, endYear: new Date().getFullYear(), description: "" });

    useEffect(() => {
        if (playerInfo) {
            setUpdatedInfo(playerInfo);
            setPositions(playerInfo.natposition || []);
            setAchievements(playerInfo.achievements || []);
            setYearsExperience(playerInfo.yearsexp || []);
        }
    }, [playerInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInfo({ ...updatedInfo, [name]: value });
    };

    const handleCheckboxChange = (position) => {
        setPositions(prev =>
            prev.includes(position)
                ? prev.filter(pos => pos !== position)
                : [...prev, position]
        );
    };

    const addAchievement = () => {
        if (newAchievement.title.trim()) {
            setAchievements([...achievements, { ...newAchievement }]);
            setNewAchievement({ title: "", type: "trophy", year: new Date().getFullYear() });
        }
    };

    const removeAchievement = (index) => {
        setAchievements(achievements.filter((_, i) => i !== index));
    };

    const addExperience = () => {
        if (newExperience.club.trim()) {
            setYearsExperience([...yearsExperience, { ...newExperience }]);
            setNewExperience({ club: "", startYear: new Date().getFullYear() - 3, endYear: new Date().getFullYear(), description: "" });
        }
    };

    const removeExperience = (index) => {
        setYearsExperience(yearsExperience.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        const finalData = {
            ...updatedInfo,
            natposition: positions,
            achievements: achievements,
            yearsexp: yearsExperience,
        };

        // Asegurar que se envíe el email del usuario para la actualización
        finalData.email = playerInfo.email;

        onSubmit(finalData);
    };


    // Opciones de posiciones específicas filtradas según la posición general
    const getPositionOptions = () => {
        const allPositions = {
            goalkeeper: ["PO"],
            defender: ["LI", "LD", "DFC"],
            midfielder: ["MCD", "MCO", "MC", "MI", "MD"],
            attacker: ["SD", "EI", "ED", "DC"]
        };

        return allPositions[updatedInfo.genposition] || [];
    };

    // Traducir posiciones específicas
    const translatePosition = (position) => {
        const translations = {
            "PO": "Portera",
            "LI": "Lateral Izquierda",
            "LD": "Lateral Derecha",
            "DFC": "Defensa Central",
            "MCD": "Mediocampista Defensiva",
            "MCO": "Mediocampista Ofensiva",
            "MC": "Mediocampista Central",
            "SD": "Segunda Delantera",
            "EI": "Extrema Izquierda",
            "ED": "Extrema Derecha",
            "MI": "Mediocampista Izquierda",
            "MD": "Mediocampista Derecha",
            "DC": "Delantera Central"
        };
        return translations[position] || position;
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
                {/* Cabecera con gradiente */}
                <div className="bg-gradient-to-r from-lime-400 to-lime-600 px-6 py-4 rounded-t-xl">
                    <h2 className="text-xl font-bold text-white">Actualiza tu Información</h2>
                </div>

                <div className="p-6 space-y-4">
                    {/* Información básica */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-700 border-b pb-1">Información Personal</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedInfo.name || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={updatedInfo.age || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={updatedInfo.weight || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={updatedInfo.height || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pie Hábil</label>
                                <select
                                    name="foot"
                                    value={updatedInfo.foot || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="right">Derecha</option>
                                    <option value="left">Izquierda</option>
                                    <option value="both">Ambidiestro</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Posición General</label>
                                <select
                                    name="genposition"
                                    value={updatedInfo.genposition || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="goalkeeper">Portera</option>
                                    <option value="defender">Defensa</option>
                                    <option value="midfielder">Mediocampista</option>
                                    <option value="attacker">Atacante</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Entrenamiento y salud */}
                    <div className="pt-2 space-y-4">
                        <h3 className="font-semibold text-gray-700 border-b pb-1 flex items-center">
                            <Activity className="h-4 w-4 mr-1 text-lime-600" />
                            Entrenamiento y Salud
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horas de Entrenamiento (semanal)</label>
                                <input
                                    type="number"
                                    name="trainingHoursPerWeek"
                                    value={updatedInfo.trainingHoursPerWeek || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lesiones</label>
                                <select
                                    name="injuryHistory"
                                    value={updatedInfo.injuryHistory || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                >
                                    <option value="0">NO</option>
                                    <option value="1">SI</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Posiciones específicas */}
                    {updatedInfo.genposition && (
                        <div className="pt-2 space-y-4">
                            <h3 className="font-semibold text-gray-700 border-b pb-1">Posiciones Específicas</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {getPositionOptions().map((position) => (
                                    <div key={position} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`position-${position}`}
                                            checked={positions.includes(position)}
                                            onChange={() => handleCheckboxChange(position)}
                                            className="h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                                        />
                                        <label htmlFor={`position-${position}`} className="text-sm text-gray-700">
                                            {translatePosition(position)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Logros */}
                    <div className="pt-2 space-y-4">
                        <h3 className="font-semibold text-gray-700 border-b pb-1 flex items-center">
                            <Award className="h-4 w-4 mr-1 text-lime-600" />
                            Logros
                        </h3>

                        <div className="space-y-3">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-800">{achievement.title}</span>
                                            <span className="ml-2 text-sm text-gray-500">({achievement.year})</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Tipo: {achievement.type === 'trophy' ? 'Trofeo' : achievement.type === 'medal' ? 'Medalla' : 'Estrella'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeAchievement(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <MinusCircle className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}

                            <div className="bg-gray-50 p-3 rounded-lg space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Título del logro"
                                        value={newAchievement.title}
                                        onChange={e => setNewAchievement({ ...newAchievement, title: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Año"
                                        value={newAchievement.year}
                                        onChange={e => setNewAchievement({ ...newAchievement, year: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <select
                                        value={newAchievement.type}
                                        onChange={e => setNewAchievement({ ...newAchievement, type: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                    >
                                        <option value="trophy">Trofeo</option>
                                        <option value="medal">Medalla</option>
                                        <option value="star">Estrella</option>
                                    </select>

                                    <button
                                        onClick={addAchievement}
                                        className="flex items-center bg-lime-500 hover:bg-lime-600 text-white px-3 py-2 rounded-lg transition-colors"
                                    >
                                        <PlusCircle className="h-4 w-4 mr-1" /> Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Experiencia */}
                    <div className="pt-2 space-y-4">
                        <h3 className="font-semibold text-gray-700 border-b pb-1 flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-lime-600" />
                            Experiencia
                        </h3>

                        <div className="space-y-3">
                            {yearsExperience.map((exp, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-800">{exp.club}</span>
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                {exp.startYear} - {exp.endYear || 'Presente'}
                                            </div>
                                            {exp.description && (
                                                <div className="text-sm text-gray-500 mt-1">{exp.description}</div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => removeExperience(index)}
                                            className="text-red-500 hover:text-red-700 ml-2"
                                        >
                                            <MinusCircle className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="bg-gray-50 p-3 rounded-lg space-y-3">
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="col-span-3">
                                        <input
                                            type="text"
                                            placeholder="Club"
                                            value={newExperience.club}
                                            onChange={e => setNewExperience({ ...newExperience, club: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Año inicio"
                                            value={newExperience.startYear}
                                            onChange={e => setNewExperience({ ...newExperience, startYear: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Año fin"
                                            value={newExperience.endYear}
                                            onChange={e => setNewExperience({ ...newExperience, endYear: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <button
                                            onClick={addExperience}
                                            className="flex items-center bg-lime-500 hover:bg-lime-600 text-white px-3 py-2 rounded-lg transition-colors"
                                        >
                                            <PlusCircle className="h-4 w-4 mr-1" /> Agregar
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <textarea
                                        placeholder="Descripción (opcional)"
                                        value={newExperience.description}
                                        onChange={e => setNewExperience({ ...newExperience, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="pt-2">
                        <h3 className="font-semibold text-gray-700 border-b pb-1">Descripción</h3>
                        <textarea
                            name="description"
                            value={updatedInfo.description || ""}
                            onChange={handleChange}
                            rows="3"
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                            placeholder="Describe tus habilidades y características como jugadora..."
                        ></textarea>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end space-x-2">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-lg transition-colors focus:outline-none"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileModal;