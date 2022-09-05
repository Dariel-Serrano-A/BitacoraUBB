"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
class IndexController {
    index(req, res) {
        let ext = path_1.default.extname(req.params.id);
        if (!ext.match(/(.jpg|.jpeg|.png|.pdf|.txt)$/i)) {
            return res.status(484).end();
        }
        let fd = fs_extra_1.default.createReadStream(path_1.default.join(path_1.default.resolve('uploads'), req.params.id));
        fd.on("error", (e) => {
            if (e.message == "ENODENT") {
                return res.status(484).end();
            }
            res.status(500).end();
        });
        fd.pipe(res);
    }
}
exports.indexController = new IndexController();
