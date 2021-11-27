const operation=require("../controllers/user.controller");

module.exports=app=>{
    app.post("/register",operation.registered);
    app.post("/login",operation.login);
}


