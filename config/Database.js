import { Sequelize } from "sequelize";

const db = new Sequelize('gmedia_democase', 'gmedia_democase2', 'Janglidalam29J',
{
    host: "gmedia.bz",
    dialect: "mysql",
    define: {        
        freezeTableName: true,
        createdAt:false,
        updatedAt:false
      },
})

export default db