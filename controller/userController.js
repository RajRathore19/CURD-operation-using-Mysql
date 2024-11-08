import { response } from "express";
import instance from "../connection/dbConnection.js";
import bcrypt from 'bcrypt';
export const registrationController = async (request, response) => {
    const { username, email, password, address } = request.body;

    const newPassword = await bcrypt.hash(password,10);
    
    const Insertquery = `insert into user values("${username}","${email}","${newPassword}","${address}")`;
    instance.query(Insertquery, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Data Inserted");
            response.render("index.ejs", { message: "" });
        }
    });
}

// export const loginController = (request, response) => {
//     const { email, password } = request.body;

//     const loginQuery = `select * from user where email= "${email}" and password="${password}"`;
//     console.log("loginquery : " + loginQuery);

//     instance.query(loginQuery, (err, data) => {
//         if (err)
//             console.log(err);
//         else {
//             if (data.length == 0)
//                 response.render("index.ejs", { message: "Email Id or password is incorrect" });
//             else {
//                 request.session.email = data[0].email;
//                 response.render("home.ejs", { email: request.session.email });
//             }
//         }
//     });
// }



//Login User

export const loginController = (request, response) => {
    const { email, password } = request.body;

    const loginQuery = `select * from user where email= "${email}"`;
    console.log("loginquery : " + loginQuery);

    instance.query(loginQuery, async (err, data) => {
        if (err)
            console.log(err);
        else {
            console.log("data :",data)
            const existingPassword = data[0].password;
            const newhash =  await bcrypt.compare(password,existingPassword);
            
            if (newhash)
               {
            request.session.email = data[0].email;
                response.render("home.ejs", { email: request.session.email });}
            else {
                response.render("index.ejs", { message: "Email Id or password is incorrect" });
            }
        }
    });


}


//update user Detail  


export const updateController = (req, res) => {
    const email = req.query.email;
    console.log("Gets entry : ",email);
    
    const userQuery = `select * from user where email = '${email}'`
    instance.query(userQuery, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("User Data : ",data);
            res.render("update.ejs",{userData:data[0]});
        }
    })
}


export const updateUserController = (request,response)=>{
    console.log("gets entry");
    const {username,email,password,address} = request.body;
    const updateQuery = `update user set username = "${username}",password = "${password}",address="${address}" where email = "${email}";`
    instance.query(updateQuery,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("updated")
            response.render("home.ejs",{email:email});
        }
    });
    
}

//Reset Password by User

export const userResetPassword = (req,res)=>{

    res.render("resetPassword.ejs",{msg:""})
}


export const userPasswordCheker = async (req,res)=>{
     const email = req.session.email;
     console.log("hyyy")
     console.log(email);
    const {password,newPassword} = req.body;

    const hashPass = await bcrypt.hash(password,10);

    const newhash =await bcrypt.compare(newPassword,hashPass);
    console.log(newhash);
    if(newhash){
        const resetQuery = `update user set password="${hashPass}" where email="${email}";`;
        instance.query(resetQuery,(err)=>{
            if(err){
                console.log(err);
            }else{
                res.render("home.ejs",{email:email});
            }
        }) 
        
    }else{
       // res.send("<h1 style:color=:'red'>Password not Match<h1>");
        res.render("resetPassword.ejs",{msg:"Password not Match"});
    }
    
}
