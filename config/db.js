const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}
)
db.connect(error =>{
    if(error){
        console.log('Database connection failed!');
    }else{
        console.log('Databse connection success!')
    }
});

module.exports = db