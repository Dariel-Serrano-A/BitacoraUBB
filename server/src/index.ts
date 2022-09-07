import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import indexRoutes from './routes/indexRoutes';
import bitacorasRoutes from './routes/bitacorasRoutes';
import notasRoutes from './routes/notasRoutes';
import recordatoriosRoutes from './routes/recordatoriosRoutes';
import calendarioRoutes from './routes/calendarioRoutes';

class Server {
    public app: Application;  
    constructor(){         
        this.app = express();
        this.config();
        this.routes();
     }
    config(): void {
        this.app.set('port', 1092);     
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use('/uploads', express.static(path.resolve('uploads')))
    }

    routes(): void {
        this.app.use('/',indexRoutes);
        this.app.use('/api/bitacoras',bitacorasRoutes);
        this.app.use('/api/notas', notasRoutes);
        this.app.use('/api/recordatorio', recordatoriosRoutes);
        this.app.use('/api/calendario', calendarioRoutes);
    }

    start (): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();