-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2024 a las 04:08:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `el bolson`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(3) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `celular` int(15) NOT NULL,
  `fecha_nac` date DEFAULT NULL,
  `ciudad` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellido`, `celular`, `fecha_nac`, `ciudad`) VALUES
(1, 'Mario', 'Fernandez', 1150302564, '1985-12-19', 'Buenos Aires'),
(2, 'Maria', 'Martinez', 1156897425, '1975-10-15', 'El Bolson'),
(3, 'Juan', 'Palermo', 1180649856, '1997-11-17', 'Posadas'),
(4, 'Adriana', 'Juarez', 1165897456, '1989-05-19', 'Buenos Aires'),
(5, 'Agustin', 'Rios', 1145698756, '1992-04-15', 'Mar del Plata'),
(6, 'Sergio', 'Albornoz', 1145698723, '1979-06-15', 'El Bolson'),
(7, 'jesica', 'Estere', 1145689723, '1990-03-19', 'Buenos Aires'),
(8, 'Roberto', 'Edgar', 1145689623, '1976-10-04', 'Rosario'),
(9, 'Alberto', 'Martin', 1145698745, '0000-00-00', 'Iguazu'),
(10, 'Santiago', 'Valle', 1135698874, '1992-12-12', 'Mendoza');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
