"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const bitacorasRoutes_1 = __importDefault(require("./routes/bitacorasRoutes"));
const notasRoutes_1 = __importDefault(require("./routes/notasRoutes"));
const recordatoriosRoutes_1 = __importDefault(require("./routes/recordatoriosRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', 1092);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/bitacoras', bitacorasRoutes_1.default);
        this.app.use('/api/notas', notasRoutes_1.default);
        this.app.use('/api/recordatorio', recordatoriosRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
