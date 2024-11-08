import instance from "../connection/dbConnection.js";

export const adminViewUsersController = (req,res)=>{
    const userQuery = `select * from user;`;
    instance.query(userQuery,(err,data)=>{
        if(err){
            console.log(err);
        }else{      

            res.render("viewUsers",{userData:data});
            }                
            }
    );
}

//admin Login 

export const adminLoginController = (req,res)=>{

    const {email,password}=req.body;

    if(email =='admin@gmail.com' && password == 'admin@123'){
        res.render("admin.ejs");
    }else{
        res.render("adminlogin.ejs");
    }
}


//Update User By Admin

export const updateAdminUserController = (req,res)=>{
    const email = req.query.email;
    console.log("Gets entry : ",email);
    
    const userUpdateQuery = `select * from user where email = '${email}'`
    instance.query(userUpdateQuery, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            //console.log("User Data : ",data);
            res.render("updateUser.ejs",{userData:data[0]});
        }
    })
}


export const adminUpdateUser = (req,res)=>{
    const {username , password, address} = req.body;
    console.log("username : ",username);
    
    const {email} = req.body;
    console.log("email : ",email);
    
        const updateAdminUser = `update user set username='${username}',password='${password}',address='${address}' where email = '${email}';`
    instance.query(updateAdminUser,(err,status)=>{
        if(err){
            console.log(err);
        }
        else{
            //console.log("status : ",status);
            if(status.affectedRows>0){
                const selectUpdateQuery = `select * from user`;
                instance.query(selectUpdateQuery,(err,data)=>{
                    if(err){
                        console.log(err);
                        
                    }else{
                        console.log("list users : ",data);
                        
                        res.render("viewUsers.ejs",{userData:data});
                    }
                })

            }else{
                res.render("updateUser.ejs",{userData:data[0]});
            }
            // res.render("admin");
        }
    });

 }



//Delete User By Admin

 export const deleteUser = (req,res)=>{

    console.log("open");
     const email = req.query.email;
    
    
    const userdeleteshowQuery = `delete from user where email = '${email}'`
    instance.query(userdeleteshowQuery, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("User Data : ",data);
            if(data.affectedRows>0){
                const selectUpdateQuery = `select * from user`;
                instance.query(selectUpdateQuery,(err,data)=>{
                    if(err){
                        console.log(err);
                        
                    }else{
                        console.log("list users : ",data);
                        res.render("viewUsers.ejs",{userData:data});
                     }
                })

            }else{
                res.send("error occur")
            }
        }
    })
 }

