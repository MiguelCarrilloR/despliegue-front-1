import React from "react";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

/**
 * Componente que representa el pie de página de la aplicación.
 * Este componente incluye enlaces a redes sociales, información adicional y enlaces de contacto.
 *
 * @returns {JSX.Element} El componente Footer.
 */
const Footer = () => {
  return (
    <div className="bg-white max-w-[1740px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-black ">
      <div>
        <h1 className="w-full text-3xl font-bold text-black">
          Promesas a la Cancha
        </h1>
        <p className="py-4 text-black">Conoce nuestras redes sociales</p>
        <div className="flex justify-between md:w-[75%] my-6">
          <Link
            to="https://www.facebook.com/profile.php?id=61561095576509"
            target="_blank"
          >
            <FaFacebookSquare
              size={30}
              className="text-black hover:scale-105 duration-300"
            />
          </Link>
          <Link
            to="https://www.instagram.com/promesasalacancha/"
            target="_blank"
          >
            <FaInstagram
              size={30}
              className="text-black hover:scale-105 duration-300"
            />
          </Link>
          <Link to="https://x.com/promesas_cancha" target="_blank">
            <FaTwitterSquare
              size={30}
              className="text-black hover:scale-105 duration-300"
            />
          </Link>
          <Link to="https://github.com/AdminPromesas" target="_blank">
            <FaGithubSquare
              size={30}
              className="text-black hover:scale-105 duration-300"
            />
          </Link>
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className="font-medium text-black">Más información</h6>
          <ul>
            <Link to="/about-players">
              <li className="py-2 text-sm text-black hover:scale-105 duration-300">
                Jugadoras
              </li>
            </Link>
            <Link to="/about-scouts">
              <li className="py-2 text-sm text-black hover:scale-105 duration-300">
                Reclutadores
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-black">Contacto</h6>
          <ul>
            <Link to="/about">
              <li className="py-2 text-sm text-black hover:scale-105 duration-300">
                Sobre nosotros
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-black">Cuenta</h6>
          <ul>
            <Link to="/login">
              <li className="py-2 text-sm text-black hover:scale-105 duration-300">
                Iniciar sesión
              </li>
            </Link>
            <Link to="/register">
              <li className="py-2 text-sm text-black hover:scale-105 duration-300">
                Registrarse
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
