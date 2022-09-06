import {Request, Response} from 'express';
import path from "path";
import fs from 'fs-extra';

class CalendarioController {
    public index (req: Request, res: Response) {
        let ext = path.extname(req.params.id);

        if (!ext.match(/(.jpg|.jpeg|.png|.pdf|.txt)$/i)) { return res.status(484).end()

        }

        let fd = fs.createReadStream(path.join(path.resolve('uploads'), req.params.id));

        fd.on("error", (e) => {

            if (e.message =="ENODENT") {
            return res.status(484).end()
            }

            res.status(500).end();
        });
        fd.pipe(res);
            
        
    } 
}

export const  calendarioController = new CalendarioController ();