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
const database_1 = __importDefault(require("../database"));
class RecordatoriosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = Array();
            try {
                const [recordatorio] = yield database_1.default.query('SELECT * FROM recordatorio'); //consulta sql  
                res.json(recordatorio);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'No hay datos en la tabla de recordatorios';
                res.json(response);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = Array();
            try {
                console.log(id);
                const [recordatorio] = yield database_1.default.query('SELECT * FROM `recordatorio` WHERE `idrecordatorio` = ?', [id]);
                return res.json(recordatorio);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'No se pudo encontrar el recordatorio';
                res.json(response);
            }
        });
    }
    getPersonalData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params;
            const response = Array();
            try {
                const [informacion, fields] = yield database_1.default.query('SELECT `usuario`.* FROM `usuario` LEFT JOIN `recordatorio` ON `recordatorio`.`idrecordatorio` = ? AND `recordatorio`.`usuario_idusuario` = `usuario`.`idusuario`;', [id]);
                return res.json(informacion);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'No se pudo enviar la información';
                res.json(response);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = Array();
            console.log(req.body);
            if (!req.body.titulorecordatorio || req.body.titulorecordatorio.length <= 0 || !validarTexto(req.body.titulo)) {
                response[0] = false;
                response[1] = 'Error en título del recordatorio';
                res.json(response);
            }
            else if (!req.body.descripcionrecordatorio || req.body.descripcionrecordatorio.length <= 0 || !validarTexto(req.body.descripcionrecordatorio)) {
                response[0] = false;
                response[1] = 'Error en descripción del recordatorio';
                res.json(response);
            }
            else if (req.body.contenido.length >= 600) {
                response[0] = false;
                response[1] = 'Error en descripción del recordatorio, no puede superar los 600 caracteres';
                res.json(response);
            }
            else {
                try {
                    const [recordatorio, fields] = yield database_1.default.query('INSERT INTO recordatorio SET ?', [req.body]);
                    response[0] = true;
                    response[1] = 'Recordatorio creado con éxito';
                    res.json(response);
                }
                catch (error) {
                    console.error(error);
                    response[0] = false;
                    response[1] = 'Error al crear el recordatorio';
                    res.json(response);
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const response = Array();
            req.body.titulorecordatorio = req.body.titulorecordatorio.toLowerCase();
            req.body.descripcionrecordatorio = req.body.descripcionrecordatorio.toLowerCase();
            req.body.descripcionrecordatorio = capitalizeFirstLetter(req.body.contenido);
            if (!req.body.titulorecordatorio || req.body.titulorecordatorio.length <= 0 || !validarTexto(req.body.titulorecordatorio)) {
                response[0] = false;
                response[1] = 'Error en título del recordatorio';
                res.json(response);
            }
            else if (!req.body.descripcionrecordatorio || req.body.descripcionrecordatorio.length <= 0 || !validarTexto(req.body.descripcionrecordatorio)) {
                response[0] = false;
                response[1] = 'Error en descripción del recordatorio';
                res.json(response);
            }
            else if (req.body.contenido.length >= 600) {
                response[0] = false;
                response[1] = 'Error en descripción de nota, no puede superar los 600 caracteres';
                res.json(response);
            }
            else {
                try {
                    const [recordatorio, fields] = yield database_1.default.query('UPDATE recordatorio SET ? WHERE idrecordatorio = ?', [req.body, id]);
                    response[0] = true;
                    response[1] = 'Recordatorio actualizado con éxito';
                    res.json(response);
                }
                catch (error) {
                    console.error(error);
                    response[0] = false;
                    response[1] = 'Error al actualizar el recordatorio';
                    res.json(response);
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const response = Array();
            try {
                const [recordatorio, fields] = yield database_1.default.query('DELETE FROM recordatorio WHERE idrecordatorio = ?', [id]);
                response[0] = true;
                response[1] = 'Recordatorio eliminado con éxito';
                res.json(response);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'Error al eliminar el recordatorio';
                res.json(response);
            }
        });
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function validarTexto(texto) {
    return /[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+/g.test(texto);
}
const recordatoriosController = new RecordatoriosController();
exports.default = recordatoriosController;
