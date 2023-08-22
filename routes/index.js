import express from "express"
import { getAdmin, Register, Login } from "../controllers/Admin.js";
import { addkaryawan, listKaryawan, nonaktifkaryawan, updatekaryawan } from "../controllers/Karyawan.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import path from "path"

const __dirname = "D:/CodeProject2/nexa_backendtest"

const router = express.Router();

router.get('/', function(req, res) {    
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
router.get('/admin', getAdmin)
router.post('/admin', Register)

router.post('/login', Login)

router.post('/listkaryawan', verifyToken, listKaryawan)
router.post('/addkaryawan', verifyToken, addkaryawan)
router.post('/updatekaryawan', verifyToken, updatekaryawan)
router.post('/nonaktifkaryawan', verifyToken, nonaktifkaryawan)


export default router