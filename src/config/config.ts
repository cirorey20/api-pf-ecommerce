// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();


const config:{
    env:string,
    isProd:boolean,
    dbUser:string,
    dbPassword:string,
    dbHost:string,
    dbName:string,
    dbPort:string,
} = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbHost: process.env.DB_HOST || '',
    dbName: process.env.DB_NAME || '',
    dbPort: process.env.DB_PORT || '',
}
// console.log("hola")

export {
    config
};
// module.exports = {
//     config
// }