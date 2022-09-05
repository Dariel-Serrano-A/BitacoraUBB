import { Router } from 'express';

import bitacorasController from '../controllers/bitacorasController';
import multer from '../libs/multer';

class BitacorasRoutes {
    public router: Router = Router(); 
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', bitacorasController.list);
        this.router.get('/:id', bitacorasController.getOne);
        this.router.get('/detail/:id', bitacorasController.getPersonalData);
        this.router.route('/').post(multer.single('archivo'),bitacorasController.create);
        this.router.put('/:id', bitacorasController.update);
        this.router.delete('/:id', bitacorasController.delete);        
    }

}

const bitacorasRoutes = new BitacorasRoutes();
export default  bitacorasRoutes.router;