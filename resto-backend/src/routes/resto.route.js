const operation=require("../controllers/resto.controller");

module.exports=app=>{

    app.get("/getResto",operation.getData);
    app.get("/getResto/:id",operation.getDataById);
    app.put("/updateById/:id",operation.updateById);

    app.post("/insetResto",operation.insertData);
    app.delete("/deleteDataById/:id",operation.deleteDataById);
}


