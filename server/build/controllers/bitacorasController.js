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
const formidable_1 = __importDefault(require("formidable"));
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
                const [bitacora, fields] = yield database_1.default.query('SELECT * FROM bitacora WHERE idbitacora = ?', [id]);
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
        return __awaiter(this, void 0, void 0, function* () {
            const form = (0, formidable_1.default)({
                multiples: true
            });
            form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
                const response = Array();
                //Minusculas
                fields.encompaniade = fields.encompaniade.toLowerCase();
                fields.actividadcorrespondea = fields.actividadcorrespondea.toLowerCase();
                //Capitalizacion de texto
                fields.descripcionbitacora = capitalizeFirstLetter(fields.descripcionbitacora);
                //Validaciones
                if (!fields.duracionactividad || fields.duracionactividad.length <= 0 || !validarNumString(fields.duracionactividad)) {
                    response[0] = false;
                    response[1] = 'Error en duracion de actividad';
                    res.json(response);
                }
                else if (!fields.descripcionbitacora || fields.descripcionbitacora.length <= 0 || !validarTexto(fields.descripcionbitacora)) {
                    response[0] = false;
                    response[1] = 'Error en descripcion de actividad';
                    res.json(response);
                }
                else if (fields.descripcionbitacora.length > 500) {
                    response[0] = false;
                    response[1] = 'Descripcion de actividad supera limite de 500 caracteres';
                    res.json(response);
                }
                else if (!fields.encompaniade || fields.encompaniade.length <= 0 || !validarTexto(fields.encompaniade)) {
                    response[0] = false;
                    response[1] = 'Error en tipo de compañia de actividad';
                    res.json(response);
                }
                else if (!fields.actividadcorrespondea || fields.actividadcorrespondea.length <= 0 || !validarTexto(fields.actividadcorrespondea)) {
                    response[0] = false;
                    response[1] = 'Error en tipo de actividad de actividad';
                    res.json(response);
                }
                else { //Insercion de datos
                    try {
                        yield database_1.default.query('INSERT INTO bitacora set ?', fields); //consulta sql
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
            }));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const form = (0, formidable_1.default)({
                multiples: true
            });
            form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
                const response = Array();
                //Minusculas
                fields.encompaniade = fields.encompaniade.toLowerCase();
                fields.actividadcorrespondea = fields.actividadcorrespondea.toLowerCase();
                //Capitalizacion de texto
                fields.descripcionbitacora = capitalizeFirstLetter(fields.descripcionbitacora);
                //Validaciones
                if (!fields.duracionactividad || fields.duracionactividad.length <= 0 || !validarNumString(fields.duracionactividad)) {
                    response[0] = false;
                    response[1] = 'Error en duracion de actividad';
                    res.json(response);
                }
                else if (!fields.descripcionbitacora || fields.descripcionbitacora.length <= 0 || !validarTexto(fields.descripcionbitacora)) {
                    response[0] = false;
                    response[1] = 'Error en descripcion de actividad';
                    res.json(response);
                }
                else if (fields.descripcionbitacora.length > 500) {
                    response[0] = false;
                    response[1] = 'Descripcion de actividad supera limite de 500 caracteres';
                    res.json(response);
                }
                else if (!fields.encompaniade || fields.encompaniade.length <= 0 || !validarTexto(fields.encompaniade)) {
                    response[0] = false;
                    response[1] = 'Error en tipo de compañia de actividad';
                    res.json(response);
                }
                else if (!fields.actividadcorrespondea || fields.actividadcorrespondea.length <= 0 || !validarTexto(fields.actividadcorrespondea)) {
                    response[0] = false;
                    response[1] = 'Error en tipo de actividad de actividad';
                    res.json(response);
                }
                else { //Actualizacion de datos
                    try {
                        yield database_1.default.query('UPDATE bitacora set ? WHERE idbitacora = ?', [fields, id]);
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
            }));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const response = Array();
            try {
                //Eliminacion de datos
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
