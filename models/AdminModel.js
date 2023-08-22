import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Admin = db.define('admin', {
    username: {
        type: 'VARCHAR(100)'
    },
    password: {
        type: 'VARBINARY(100)'
    }
    
})

export default Admin