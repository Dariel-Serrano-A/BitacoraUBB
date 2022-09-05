import { Router } from 'express';

import { indexController } from  '../controllers/indexController';

class IndexRoutes {
    public router: Router = Router(); 
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:id', indexController.index);
    }

}

const indexRoutes = new IndexRoutes();
export default  indexRoutes.router;