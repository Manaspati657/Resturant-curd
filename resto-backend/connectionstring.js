const mysql = require('mysql');

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"node_mysql_crud_db"
});

con.connect((error)=>{
  if(error) throw error;
  console.log("db connected.");
})

module.exports=con;