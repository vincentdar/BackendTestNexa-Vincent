import Admin from "../models/AdminModel.js";
import AdminToken from "../models/AdminTokenModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import moment from "moment"


export const getAdmin = async(req, res) => {
    try {
        console.log("Fetching data from Admin")
        const admin = await Admin.findAll();
        res.json(admin);        
    } catch (error) {
        console.log(error)
    }
}

export const Register = async(req, res) => {
    const {username, password} = req.body;
    const salt = await bcrypt.genSalt();    
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword)
    try {
        await Admin.create({
            username: username,
            password: hashPassword
        });
        res.json({msg: "Register berhasil"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {   
        console.log(req.body)     
        const admin = await Admin.findAll({            
            where:{
                username: req.body.username
            }
        });    
        // console.log(admin[0].password.toString())
        // res.json(admin[0].password.toString())        
        const match = await bcrypt.compare(req.body.password, admin[0].password.toString());                        
        if (!match) return res.status(400).json({msg:"Password Salah"});        
        
        const adminID = admin[0].id;
        const adminUsername = admin[0].username;
        const adminPassword = req.body.password
        const accessToken = jwt.sign({adminUsername, adminPassword}, process.env.ACCESS_TOKEN_SECRET,
             {expiresIn: "1d"})   

        var dateFormat = 'YYYY-MM-DD HH:mm:ss';
        var dateNow = moment().add(1, 'days').tz("Asia/Bangkok").format(dateFormat);
        console.log(dateNow)
 
        try {
            await AdminToken.create({
                id_admin: adminID,
                token: accessToken,
                expired_at:  dateNow
            });
            res.json({msg: "Login berhasil", accessToken: accessToken});
            console.log("Admin Token berhasil disimpan");
        } catch (error) {
            console.log(error);
        }         
        
        res.send(accessToken)
    } catch (error) {
        // res.status(404).json({msg:"Login username tidak ditemukan"})
        console.log(error)
    }
}
