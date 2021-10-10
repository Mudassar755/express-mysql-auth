require('dotenv').config()

module.exports = {
    development: {
    host: "localhost",
    username: "root",
    password: "",
    database: "reactExpress",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}
//     development: {
//         database: process.env.DATABASE,
//         username: process.env.USERNAME,
//         password: process.env.PASSWORD,
//         host: process.env.HOST,
//         dialect: "mysql",
//         define: {
//             underscored: true
//         }
//     }
}
