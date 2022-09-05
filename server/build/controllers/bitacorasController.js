"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("../database"));
class BitacorasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = Array();
            try {
                const [bitacora] = yield database_1.default.query('SELECT * FROM bitacora'); //consulta sql  
                res.json(bitacora);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'No hay datos en la tabla de bitacoras';
                res.json(response);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = Array();
            try {
                const [bitacora] = yield database_1.default.query('SELECT * FROM bitacora WHERE idbitacora = ?', [id]);
                return res.json(bitacora);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'La bitacora no ha sido creada';
                res.json(response);
            }
        });
    }
    getPersonalData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = Array();
            try {
                const [informacion, fields] = yield database_1.default.query('SELECT `usuario`.* FROM `usuario` LEFT JOIN `bitacora` ON `bitacora`.`idbitacora` = ? AND `bitacora`.`usuario_idusuario` = `usuario`.`idusuario`;', [id]);
                return res.json(informacion);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'No se pudo enviar la informacion';
                res.json(response);
            }
        });
    }
    create(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const allowedExtensions = /(.jpg|.jpeg|.png|.pdf|.txt)$/i;
            const response = Array();
            //Minusculas
            req.body.encompaniade = req.body.encompaniade.toLowerCase();
            req.body.actividadcorrespondea = req.body.actividadcorrespondea.toLowerCase();
            //Capitalizacion de texto
            req.body.descripcionbitacora = capitalizeFirstLetter(req.body.descripcionbitacora);
            //Validaciones
            if (!req.body.duracionactividad || req.body.duracionactividad.length <= 0) {
                response[0] = false;
                response[1] = 'No se ha enviado duración de actividad';
                res.json(response);
            }
            else if (!validarNumString(req.body.duracionactividad)) {
                response[0] = false;
                response[1] = 'Los caracteres de duración de actividad no son válidos';
                res.json(response);
            }
            else if (!req.body.descripcionbitacora || req.body.descripcionbitacora.length <= 0) {
                response[0] = false;
                response[1] = 'No se ha enviado descripción de actividad';
                res.json(response);
            }
            else if (!validarTexto(req.body.descripcionbitacora)) {
                response[0] = false;
                response[1] = 'Los caracteres de descripción de actividad no son válidos';
                res.json(response);
            }
            else if (req.body.descripcionbitacora.length > 1500) {
                response[0] = false;
                response[1] = 'La descripcion de actividad supera limite de 1500 caracteres';
                res.json(response);
            }
            else if (!req.body.encompaniade || req.body.encompaniade.length <= 0) {
                response[0] = false;
                response[1] = 'No se ha enviado la compañía de actividad';
                res.json(response);
            }
            else if (!validarTexto(req.body.encompaniade)) {
                response[0] = false;
                response[1] = 'Los caracteres de compañía de actividad no son válidos';
                res.json(response);
            }
            else if (!req.body.actividadcorrespondea || req.body.actividadcorrespondea.length <= 0) {
                response[0] = false;
                response[1] = 'No se ha enviado el tipo de actividad';
                res.json(response);
            }
            else if (!validarTexto(req.body.actividadcorrespondea)) {
                response[0] = false;
                response[1] = 'Los caracteres de tipo de actividad no son válidos';
                res.json(response);
            }
            else if (req.file) {
                if (allowedExtensions.exec((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname)) {
                    req.body.nombreArchivo = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
                    try {
                        yield database_1.default.query('INSERT INTO bitacora set ?', req.body); //consulta sql
                        response[0] = true;
                        response[1] = 'La bitacora fue guardada con exito';
                        res.json(response);
                    }
                    catch (error) {
                        console.error(error);
                        response[0] = false;
                        response[1] = 'La bitacora no pudo ser guardada';
                        res.json(response);
                    }
                }
                else {
                    response[0] = false;
                    response[1] = 'El archivo no tiene una extencion valida, permitidas .jpg .jpeg .png .pdf .txt';
                    res.json(response);
                }
                return;
            }
            else {
                //Insercion de datos
                req.body.nombreArchivo = '';
                try {
                    yield database_1.default.query('INSERT INTO bitacora set ?', req.body); //consulta sql
                    response[0] = true;
                    response[1] = 'La bitacora fue guardada con exito';
                    res.json(response);
                }
                catch (error) {
                    console.error(error);
                    response[0] = false;
                    response[1] = 'La bitacora no pudo ser guardada';
                    res.json(response);
                }
            }
        });
    }
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const response = Array();
            //Minusculas
            req.body.encompaniade = req.body.encompaniade.toLowerCase();
            req.body.actividadcorrespondea = req.body.actividadcorrespondea.toLowerCase();
            req.body.nombreArchivo = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
            //Capitalizacion de texto
            req.body.descripcionbitacora = capitalizeFirstLetter(req.body.descripcionbitacora);
            //Validaciones
            if (!req.body.duracionactividad || req.body.duracionactividad.length <= 0) {
                response[0] = false;
                response[1] = 'No se ha enviado duración de actividad';
                res.json(response);
            }
            else if (!validarNumString(req.body.duracionactividad)) {
                response[0] = false;
                response[1] = 'Los caracteres de duración de actividad no son válidos';
                res.json(response);
            }
            else if (!req.body.descripcionbitacora || req.body.descripcionbitacora.length <= 0) {
                response[0] = false;
                response[1] = 'No se ha enviado descripción de actividad';
                res.json(response);
            }
            else if (!validarTexto(req.body.descripcionbitacora)) {
                response[0] = false;
                response[1] = 'Los caracteres de descripción de actividad no son válidos';
                res.json(response);
            }
            else if (req.body.descripcionbitacora.length > 1500) {
                response[0] = false;
                response[1] = 'La descripcion de actividad supera limite de 1500 caracteres';
                res.json(response);
            }
            else if (!req.body.encompaniade || req.body.encompaniade.length <= 0) {
                response[0] = false;
                response[1] = 'No se ha enviado la compañía de actividad';
                res.json(response);
            }
            else if (!validarTexto(req.body.encompaniade)) {
                response[0] = false;
                response[1] = 'Los caracteres de compañía de actividad no son válidos';
                res.json(response);
            }
            else if (!req.body.actividadcorrespondea || req.body.actividadcorrespondea.length <= 0) {
                response[0] = false;
                response[1] = 'No se ha enviado el tipo de actividad';
                res.json(response);
            }
            else if (!validarTexto(req.body.actividadcorrespondea)) {
                response[0] = false;
                response[1] = 'Los caracteres de tipo de actividad no son válidos';
                res.json(response);
            }
            else if (req.body.nombreArchivo) {
                response[0] = false;
                response[1] = 'Los caracteres de tipo de actividad no son válidos';
                res.json(response);
            }
            else { //Actualizacion de datos
                try {
                    yield database_1.default.query('UPDATE bitacora set ? WHERE idbitacora = ?', [req.body, id]);
                    response[0] = true;
                    response[1] = 'La bitacora fue actualizada con exito';
                    res.json(response);
                }
                catch (error) {
                    console.error(error);
                    response[0] = false;
                    response[1] = 'La bitacora no pudo ser actualizada';
                    res.json(response);
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = Array();
            try {
                //Eliminacion de datos
                const [bitacora] = yield database_1.default.query('SELECT * FROM bitacora WHERE idbitacora = ?', [id]);
                if (bitacora[0].nombreArchivo) {
                    yield fs_extra_1.default.unlink(path_1.default.resolve(bitacora[0].nombreArchivo));
                }
                yield database_1.default.query('DELETE FROM bitacora WHERE idbitacora = ?', [id]);
                response[0] = true;
                response[1] = 'La bitacora fue eliminada';
                res.json(response);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'La bitacora no pudo ser eliminada';
                res.json(response);
            }
        });
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function validarNumString(texto) {
    return /^([0-9])*$/g.test(texto);
}
function validarTexto(texto) {
    return /[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+/g.test(texto);
}
const bitacorasController = new BitacorasController();
exports.default = bitacorasController;
