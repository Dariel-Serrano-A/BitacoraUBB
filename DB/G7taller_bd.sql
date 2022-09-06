-- phpMyAdmin SQL Dump
-- version 5.0.4deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 06-09-2022 a las 00:17:10
-- Versión del servidor: 8.0.28
-- Versión de PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `G7taller_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora`
--

CREATE TABLE `bitacora` (
  `idbitacora` int NOT NULL,
  `duracionactividad` varchar(4) DEFAULT NULL,
  `descripcionbitacora` varchar(1500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `encompaniade` set('jefatura','otros practicantes','grupo','en forma individual','otra compañia') NOT NULL,
  `actividadcorrespondea` set('reunion','busqueda informacion','estudio software','estudio hardware','trabajo terreno','exposicion','lectura de manuales','estudios de framework','instalacion software','instalacion hardware','otra actividad') NOT NULL,
  `usuario_idusuario` int NOT NULL,
  `created_at` date NOT NULL,
  `nombreArchivo` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `bitacora`
--

INSERT INTO `bitacora` (`idbitacora`, `duracionactividad`, `descripcionbitacora`, `encompaniade`, `actividadcorrespondea`, `usuario_idusuario`, `created_at`, `nombreArchivo`) VALUES
(10, '0444', 'Descripcion prueba', 'en forma individual', 'otra actividad', 1, '2022-08-02', ''),
(11, '200', 'He investigado acerca de angular y rest apis', 'en forma individual', 'exposicion', 1, '2022-08-02', ''),
(12, '333', 'Reunion de gerencia', 'grupo', 'reunion', 1, '2022-08-02', ''),
(13, '200', 'Prueba', 'grupo', 'busqueda informacion', 1, '2022-08-02', ''),
(14, '333', 'Reunion de gerencia', 'grupo', 'reunion', 1, '2022-08-02', ''),
(15, '333', 'Reunion de gerencia', 'grupo', 'reunion', 1, '2022-08-05', ''),
(16, '200', 'Prueba horaria', 'en forma individual', 'lectura de manuales', 1, '2022-08-02', ''),
(17, '0025', 'Coordinacion post reunion con jefatura', 'jefatura', 'reunion', 1, '2022-08-02', ''),
(21, '0010', 'Test', 'grupo', 'trabajo terreno', 1, '2022-02-09', 'credencialesnew.txt'),
(22, '0010', 'Test', 'grupo', 'trabajo terreno', 1, '2022-02-09', 'uploads\\1dc1a173-be36-48a5-b93f-be8bf460681d.txt'),
(23, '0010', 'Test', 'grupo', 'trabajo terreno', 1, '2022-02-09', ''),
(26, '0010', 'Test', 'grupo', 'trabajo terreno', 1, '2022-02-09', 'uploads\\2022-09-05-9dd6dc26-b51a-4a0e-96e1-626018306085.txt');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota`
--

CREATE TABLE `nota` (
  `idnotas` int NOT NULL,
  `titulo` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contenido` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `usuario_idusuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `nota`
--

INSERT INTO `nota` (`idnotas`, `titulo`, `contenido`, `usuario_idusuario`) VALUES
(1, 'prueba', 'Este contenido debería ser mostrado', 1),
(5, 'Progreso', 'Por el progreso', 1),
(6, 'Hola', 'Este mensaje se ha dejado con éxito a las 13:51 pm de día 19 de agosto de 2022', 1),
(8, 'Hola', 'Esto es una nota para equilibrar', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recordatorio`
--

CREATE TABLE `recordatorio` (
  `idrecordatorio` int NOT NULL,
  `titulorecordatorio` varchar(50) DEFAULT NULL,
  `fecharecordatorio` date DEFAULT NULL,
  `horarecordatorio` varchar(4) DEFAULT NULL,
  `descripcionrecordatorio` varchar(600) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `usuario_idusuario` int NOT NULL,
  `email` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idrol` int NOT NULL,
  `nombrerol` varchar(50) DEFAULT NULL,
  `descripcionrol` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idrol`, `nombrerol`, `descripcionrol`) VALUES
(1, 'Estudiante', 'Rol de estudiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idusuario` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `rol_idrol` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `nombre`, `apellido`, `correo`, `password`, `rol_idrol`) VALUES
(1, 'Dariel', 'Serrano', 'dariel.serrano1601@alumnos.ubiobio.cl', '12345', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`idbitacora`),
  ADD KEY `fk_bitacora_usuario1_idx` (`usuario_idusuario`);

--
-- Indices de la tabla `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`idnotas`),
  ADD KEY `fk_nota_rapida_usuario1_idx` (`usuario_idusuario`);

--
-- Indices de la tabla `recordatorio`
--
ALTER TABLE `recordatorio`
  ADD PRIMARY KEY (`idrecordatorio`),
  ADD KEY `fk_recordatorio_usuario1_idx` (`usuario_idusuario`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idrol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idusuario`),
  ADD KEY `fk_usuario_rol2_idx` (`rol_idrol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `idbitacora` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `nota`
--
ALTER TABLE `nota`
  MODIFY `idnotas` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `recordatorio`
--
ALTER TABLE `recordatorio`
  MODIFY `idrecordatorio` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idrol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idusuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD CONSTRAINT `fk_bitacora_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`);

--
-- Filtros para la tabla `nota`
--
ALTER TABLE `nota`
  ADD CONSTRAINT `fk_nota_rapida_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`);

--
-- Filtros para la tabla `recordatorio`
--
ALTER TABLE `recordatorio`
  ADD CONSTRAINT `fk_recordatorio_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_rol2` FOREIGN KEY (`rol_idrol`) REFERENCES `rol` (`idrol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
