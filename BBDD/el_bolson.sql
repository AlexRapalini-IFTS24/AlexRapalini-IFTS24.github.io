-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-10-2024 a las 01:50:49
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
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id_administrador` int(3) NOT NULL,
  `fk_usuario` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id_administrador`, `fk_usuario`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(3) NOT NULL,
  `fk_usuario` int(3) NOT NULL,
  `fecha_nac` date NOT NULL,
  `fk_provincia` int(3) NOT NULL,
  `fk_genero` int(3) NOT NULL,
  `fk_tipo_cerveza` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `fk_usuario`, `fecha_nac`, `fk_provincia`, `fk_genero`, `fk_tipo_cerveza`) VALUES
(1, 2, '1985-05-15', 3, 2, 5),
(2, 3, '1990-06-14', 5, 1, 7),
(3, 4, '1984-10-17', 3, 2, 11),
(4, 5, '1994-05-17', 3, 1, 5),
(5, 6, '1975-10-12', 3, 3, 8),
(6, 7, '1989-12-05', 3, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `id_comentario` int(3) NOT NULL,
  `fk_cliente` int(3) NOT NULL,
  `comentario` varchar(250) DEFAULT NULL,
  `imagen` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`id_comentario`, `fk_cliente`, `comentario`, `imagen`) VALUES
(1, 3, 'Gran lugar. Me encantó', '1730160193596.PNG'),
(2, 5, 'La pasamos genial', '1730160229703.PNG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galeria`
--

CREATE TABLE `galeria` (
  `id_galeria` int(3) NOT NULL,
  `fk_administrador` int(3) NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `pie_foto` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id_genero` int(3) NOT NULL,
  `nombre_genero` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id_genero`, `nombre_genero`) VALUES
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincias`
--

CREATE TABLE `provincias` (
  `id_provincia` int(3) NOT NULL,
  `nombre_provincia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `provincias`
--

INSERT INTO `provincias` (`id_provincia`, `nombre_provincia`) VALUES
(1, 'Buenos Aires'),
(2, 'Ciudad Autónoma de Buenos Aires'),
(3, 'Catamarca'),
(4, 'Chaco'),
(5, 'Chubut'),
(6, 'Córdoba'),
(7, 'Corrientes'),
(8, 'Entre Ríos'),
(9, 'Formosa'),
(10, 'Jujuy'),
(11, 'La pampa'),
(12, 'La Rioja'),
(13, 'Mendoza'),
(14, 'Misiones'),
(15, 'Neuquen'),
(16, 'Río Negro'),
(17, 'Salta'),
(18, 'San Juan'),
(19, 'San Luis'),
(20, 'Santa Cruz'),
(21, 'Santa Fe'),
(22, 'Santiago del Estero'),
(23, 'Tierra del Fuego'),
(24, 'Tucumán');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_usuario`
--

CREATE TABLE `rol_usuario` (
  `id_rol_usuario` int(3) NOT NULL,
  `nombre_rol_usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rol_usuario`
--

INSERT INTO `rol_usuario` (`id_rol_usuario`, `nombre_rol_usuario`) VALUES
(1, 'Cliente'),
(2, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_cerveza`
--

CREATE TABLE `tipo_cerveza` (
  `id_tipo_cerveza` int(3) NOT NULL,
  `nombre_tipo_cerveza` varchar(25) NOT NULL,
  `caracteristica` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_cerveza`
--

INSERT INTO `tipo_cerveza` (`id_tipo_cerveza`, `nombre_tipo_cerveza`, `caracteristica`) VALUES
(1, 'Lager', 'Sabor suave y crujiente, perfecta para los días calurosos.'),
(2, 'IPA (India Pale Ale)', 'Intensamente lupulada y amarga, ideal para los amantes de sabores fuertes.'),
(3, 'Stout', 'Cerveza oscura con sabores a café y chocolate.'),
(4, 'Pilsner', 'Refrescante y ligeramente amarga, muy popular en Europa.'),
(5, 'Witbier', 'Cerveza de trigo con notas cítricas y especiadas.'),
(6, 'Saison', 'Cerveza de temporada con un perfil seco y afrutado.'),
(7, 'Amber Ale', 'Maltosa y dulce, con un sutil toque de caramelo.'),
(8, 'Porter', 'Oscura y rica, con sabores de cacao y café tostado.'),
(9, 'Hefeweizen', 'Cerveza de trigo alemana, con notas de plátano y clavo.'),
(10, 'Sour Ale', 'Ácida y refrescante, perfecta para un cambio de ritmo.'),
(11, 'Honey', 'Dulce y suave con notas de miel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(3) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `imagen_perfil` varchar(100) NOT NULL,
  `fk_rol_usuario` int(3) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fechaYhora_creación` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `imagen_perfil`, `fk_rol_usuario`, `email`, `password`, `fechaYhora_creación`) VALUES
(1, 'Alexander', 'Rapalini', '1730065445324.png', 2, 'adr@gmail.com', '$2b$08$PnTU02AIc0msttv.oJE2jOstyWr2EpEZe7X8gEkG9LPDjawhqllLe', '2024-10-27 21:44:05'),
(2, 'Maria', 'Gomez', '1730066849645.PNG', 1, 'mg@gmail.com', '$2b$08$tkQ2oDmvSYJAM2Z0n9S3s.4ty3R8aBTIGVS3aI66sQYBMkpteYn6y', '2024-10-27 22:07:29'),
(3, 'Santiago', 'Perez', '1730066901968.PNG', 1, 'sp@gmail.com', '$2b$08$uaLFnaXB/oIRxPRBNLqkXudE2WHYoDdSaKssyzx8vnQjLdlUUYQJu', '2024-10-27 22:08:21'),
(4, 'Barbara', 'Rojas', '1730066944410.PNG', 1, 'br@gmail.com', '$2b$08$Cxp1LjKaNhVm9mY3xGgut.MVhvpVG8SymghT7xpqUfJTgQpXjr1z2', '2024-10-27 22:09:04'),
(5, 'Enrique', 'Baute', '1730066993385.PNG', 1, 'eb@gmail.com', '$2b$08$P.YQwcUVfhuUbV9q7Qcfqek/Gt53nvqHba89jizyCep.vLg7Tpw/C', '2024-10-27 22:09:53'),
(6, 'Ana', 'Garcia', '1730067045263.PNG', 1, 'ag@gmail.com', '$2b$08$XkeeA9C47iRJxzv0VSTrBewZ3pAqhfgxMTy7eaGqqmNH2qYPFSMLW', '2024-10-27 22:10:45'),
(7, 'Jorge', 'Uno', '1730067086943.PNG', 1, 'ju@gmail.com', '$2b$08$SaYhuh/oHQo0Rjymhy5pnuMK/v6SXZedI3kZXjCmBp/3F447LzjsG', '2024-10-27 22:11:26'),
(8, 'Matias', 'Favregas', '1730141437400.PNG', 1, 'mv@gmail.com', '$2b$08$tWuyK1QK4sO5fUZB2dZznuvs4BKzhBsYHJiCaFL7nSMWvvEGth7bu', '2024-10-28 17:15:37');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id_administrador`),
  ADD KEY `fk_usuario_idx` (`fk_usuario`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `fk_usuario_cliente_idx` (`fk_usuario`),
  ADD KEY `fk_provincia_idx` (`fk_provincia`),
  ADD KEY `fk_genero_idx` (`fk_genero`),
  ADD KEY `fk_tipo_cerveza_idx` (`fk_tipo_cerveza`),
  ADD KEY `fk_usuario_idx` (`fk_usuario`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `fk_cliente_idx` (`fk_cliente`);

--
-- Indices de la tabla `galeria`
--
ALTER TABLE `galeria`
  ADD PRIMARY KEY (`id_galeria`),
  ADD KEY `fk_administrador_idx` (`fk_administrador`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id_genero`);

--
-- Indices de la tabla `provincias`
--
ALTER TABLE `provincias`
  ADD PRIMARY KEY (`id_provincia`);

--
-- Indices de la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD PRIMARY KEY (`id_rol_usuario`);

--
-- Indices de la tabla `tipo_cerveza`
--
ALTER TABLE `tipo_cerveza`
  ADD PRIMARY KEY (`id_tipo_cerveza`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_rol_usuario_idx` (`fk_rol_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id_administrador` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id_comentario` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `galeria`
--
ALTER TABLE `galeria`
  MODIFY `id_galeria` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id_genero` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `provincias`
--
ALTER TABLE `provincias`
  MODIFY `id_provincia` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  MODIFY `id_rol_usuario` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_cerveza`
--
ALTER TABLE `tipo_cerveza`
  MODIFY `id_tipo_cerveza` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD CONSTRAINT `fk_mg_usuario` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `fk_mg_genero` FOREIGN KEY (`fk_genero`) REFERENCES `generos` (`id_genero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mg_provincia` FOREIGN KEY (`fk_provincia`) REFERENCES `provincias` (`id_provincia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mg_tipo_cerveza` FOREIGN KEY (`fk_tipo_cerveza`) REFERENCES `tipo_cerveza` (`id_tipo_cerveza`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mg_usuario_cliente` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `fk_mg_cliente` FOREIGN KEY (`fk_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `galeria`
--
ALTER TABLE `galeria`
  ADD CONSTRAINT `fk_mg_administrador` FOREIGN KEY (`fk_administrador`) REFERENCES `administradores` (`id_administrador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_mg_pelicula` FOREIGN KEY (`fk_rol_usuario`) REFERENCES `rol_usuario` (`id_rol_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
