import AdminToken from "../models/AdminTokenModel.js";
import Karyawan from "../models/KaryawanModel.js";
import { Sequelize } from "sequelize";
import Admin from "../models/AdminModel.js";
import moment from "moment"
import db from "../config/Database.js";
const Op = Sequelize.Op;

function hasSpecialChars(str) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(format.test(str)){
        return true;
    } else {
        return false;
    }
  }

export const listKaryawan = async(req, res) => {    
    try {                
        const start = req.body.start
        const count = req.body.count
        const keyword = req.body.keyword
        
        if(hasSpecialChars(keyword)) return res.status(400).json({msg:"Mohon input ulang"})        

        const karyawan = await Karyawan.findAll({
            offset: start,
            limit: count,
            where: {
                nama: { [Op.substring]: keyword }
            }});
        if (karyawan.length==0) return res.json("Data Tidak ditemukan")
        res.json(karyawan);        
    } catch (error) {
        res.status(500).json({error: "server error"});
    }
}

export const addkaryawan = async(req, res) => {
    try { 
        var dateFormat = 'YYYY-MM-DD HH:mm:ss';
        var dateNow = moment().tz("Asia/Bangkok").format(dateFormat);
        
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];       
        
        const tokenOwner = await AdminToken.findAll({
            where: {
                token: token
            }
        })   
        
        var id_admin = tokenOwner[0].id_admin
        const adminOwner = await Admin.findAll({
            where: {
                id: id_admin
            }
        })        

        const namaAdmin = adminOwner[0].username        
        
        const nama = req.body.nama
        const alamat = req.body.alamat
        const gend = req.body.gend
        const photo = new Buffer.from(req.body.photo).toString('base64')
        const tgl_lahir = req.body.tgl_lahir
           
        const results = await db.query("CALL sp_add_kary_vincent(:user_id, :nama, :alamat, :gend, :photo, :tgl_lahir, :uploader, :insert_at)",
        {replacements:{
            user_id: id_admin,
            nama: nama,
            alamat: alamat,
            gend: gend,
            photo:photo,
            tgl_lahir:tgl_lahir,
            uploader: namaAdmin,
            insert_at: dateNow
        }}).then(v=>console.log(v));

        res.status(200).json("Karyawan berhasil ditambahkan")
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "server error"});
    }
}


export const updatekaryawan = async(req, res) => {
    try { 
        var dateFormat = 'YYYY-MM-DD HH:mm:ss';
        var dateNow = moment().tz("Asia/Bangkok").format(dateFormat);
        
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];       
        
        const tokenOwner = await AdminToken.findAll({
            where: {
                token: token
            }
        })   
        
        var id_admin = tokenOwner[0].id_admin
        const adminOwner = await Admin.findAll({
            where: {
                id: id_admin
            }
        })        

        const namaAdmin = adminOwner[0].username        
        
        const nip = req.body.nip
        const nama = req.body.nama
        const alamat = req.body.alamat
        const gend = req.body.gend        
        const photo = new Buffer.from(req.body.photo).toString('base64')
        const tgl_lahir = req.body.tgl_lahir
           
        const karyawan = await Karyawan.findAll({
            where: {
                nip: nip
            }
        }).catch(function(onFail){
            return res.status(500).json({error: "server error"});
        });

        const karyawan_new = karyawan[0];
        
        const results = await karyawan_new.update({
            nama: nama,
            alamat: alamat,
            gend: gend,
            photo:photo,
            tgl_lahir:tgl_lahir, 
            update_at:dateNow,
            update_by:namaAdmin                       
        }).catch(function(onFail){
            return res.status(500).json({error: "server error"});
        });
                        
        res.send(results)
        
    } catch (error) {
        res.status(500).json({error: "server error"});
    }
}

export const nonaktifkaryawan = async(req, res) => {
    try { 
        var dateFormat = 'YYYY-MM-DD HH:mm:ss';
        var dateNow = moment().tz("Asia/Bangkok").format(dateFormat);
        
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];       
        
        const tokenOwner = await AdminToken.findAll({
            where: {
                token: token
            }
        })   
        
        var id_admin = tokenOwner[0].id_admin
        const adminOwner = await Admin.findAll({
            where: {
                id: id_admin
            }
        })        

        const namaAdmin = adminOwner[0].username        
        
        const nip = req.body.nip        
           
        const karyawan = await Karyawan.findAll({
            where: {
                nip: nip
            }
        }).catch(function(onFail){
            return res.status(500).json({error: "server error"});
        });

        const karyawan_new = karyawan[0];        
        const results = await karyawan_new.update({
           status:9,
           update_at:dateNow,
           update_by:namaAdmin   
        }).catch(function(onFail){
            return res.status(500).json({error: "server error"});
        });
                        
        res.send(results)
    
    } catch (error) {
        return res.status(500).json({error: "server error"});
    }
}

