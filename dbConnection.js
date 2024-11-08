import mysql from 'mysql';
const instance = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mynewdb"
});

instance.connect((error)=>{
    if(error)
        console.log("error occured");
    else{
        console.log("Database Connected");
    }    
});

export default instance;