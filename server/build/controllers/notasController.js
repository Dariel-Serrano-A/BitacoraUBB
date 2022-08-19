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
class NotasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = Array();
            try {
                const [nota] = yield database_1.default.query('SELECT * FROM nota'); //consulta sql  
                res.json(nota);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'No hay datos en la tabla de notas';
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
                const [nota] = yield database_1.default.query('SELECT * FROM `nota` WHERE `idnotas` = ?', [id]);
                return res.json(nota);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'No se pudo encontrar la nota';
                res.json(response);
            }
        });
    }
    getPersonalData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params;
            const response = Array();
            try {
                const [informacion, fields] = yield database_1.default.query('SELECT `usuario`.* FROM `usuario` LEFT JOIN `nota` ON `nota`.`idnotas` = ? AND `nota`.`usuario_idusuario` = `usuario`.`idusuario`;', [id]);
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
            if (!req.body.titulo || req.body.titulo.length <= 0 || !validarTexto(req.body.titulo)) {
                response[0] = false;
                response[1] = 'Error en título de nota';
                res.json(response);
            }
            else if (!req.body.contenido || req.body.contenido.length <= 0 || !validarTexto(req.body.contenido)) {
                response[0] = false;
                response[1] = 'Error en descripción de nota';
                res.json(response);
            }
            else if (req.body.contenido.length >= 500) {
                response[0] = false;
                response[1] = 'Error en descripción de nota, no puede superar los 500 caracteres';
                res.json(response);
            }
            else {
                try {
                    const [nota, fields] = yield database_1.default.query('INSERT INTO nota SET ?', [req.body]);
                    response[0] = true;
                    response[1] = 'Nota creada con éxito';
                    res.json(response);
                }
                catch (error) {
                    console.error(error);
                    response[0] = false;
                    response[1] = 'Error al crear la nota';
                    res.json(response);
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const response = Array();
            req.body.titulo = req.body.titulo.toLowerCase();
            req.body.contenido = req.body.contenido.toLowerCase();
            req.body.contenido = capitalizeFirstLetter(req.body.contenido);
            if (!req.body.titulo || req.body.titulo.length <= 0 || !validarTexto(req.body.titulo)) {
                response[0] = false;
                response[1] = 'Error en título de nota';
                res.json(response);
            }
            else if (!req.body.contenido || req.body.contenido.length <= 0 || !validarTexto(req.body.contenido)) {
                response[0] = false;
                response[1] = 'Error en descripción de nota';
                res.json(response);
            }
            else if (req.body.contenido.length >= 500) {
                response[0] = false;
                response[1] = 'Error en descripción de nota, no puede superar los 500 caracteres';
                res.json(response);
            }
            else {
                try {
                    const [nota, fields] = yield database_1.default.query('UPDATE nota SET ? WHERE idnotas = ?', [req.body, id]);
                    response[0] = true;
                    response[1] = 'Nota actualizada con éxito';
                    res.json(response);
                }
                catch (error) {
                    console.error(error);
                    response[0] = false;
                    response[1] = 'Error al actualizar la nota';
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
                const [nota, fields] = yield database_1.default.query('DELETE FROM nota WHERE idnotas = ?', [id]);
                response[0] = true;
                response[1] = 'Nota eliminada con éxito';
                res.json(response);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'Error al eliminar la nota';
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
const notasController = new NotasController();
exports.default = notasController;
