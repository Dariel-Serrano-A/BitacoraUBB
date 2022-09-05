import multer from 'multer'
import path from 'path'
import {v4 as uuidv4} from 'uuid';

// Settings
const allowedExtensions = /(.jpg|.jpeg|.png|.pdf|.txt)$/i;
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        if (file){
            if(allowedExtensions.exec(file.originalname)){
                cb(null, (new Date().toLocaleDateString("es-CL",  {timeZone: "America/Santiago"}).split('-').reverse().join('-')) + '-' + uuidv4() + path.extname(file.originalname))
            }
        }
    }
});
export default multer({storage});
