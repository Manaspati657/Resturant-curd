// const Resturant=require("../models/resto.model");

const con = require("../../connectionstring");


exports.getData=(req,res)=>{
    const query="select * from resturants where activeId=1";
    con.query(query,(err, rows)=>{
       if(err) {
           console.log(err);
           res.send(rows);
        //    result(null,err);
       }else{
           console.log("Resturant: ",rows);
           res.send(rows);
       }
       
   })
}

exports.insertData=(req,res)=>{
    const query =`insert into resturants (name,email,address,activeId,deleteId) values ("${req.body.name}","${req.body.email}","${req.body.address}",1,0)`;
    console.log(query);
    con.query(query,(err, result)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            // let msg=`${result.affectedRows} row inserted `;
            // console.log("successfully added ... ");
            // res.send(msg)
            // res.setHeaderStatus(201)
            res.status(201)
            console.log(result);
            res.json({"success":"ok"})
        }
        
    })
}

exports.deleteDataById=(req,res)=>{
    const query=`update resturants set deleteId=1 , activeId=0 where id =${req.params.id}`;
    console.log(query);
    con.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.status(201)
            console.log(result);
            res.json({"success":"ok"})
        }
    })
}

exports.getDataById=(req,res)=>{
    const query=`select * from resturants where id =${req.params.id}`;
    console.log(query);
    con.query(query,(err,rows)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.status(201)
            res.send(rows);
        }
    })
}

exports.updateById=(req,res)=>{
    const query=`update resturants set name="${req.body.name}",email="${req.body.email}",address="${req.body.address}" where id =${req.params.id}`;
    console.log(query);
    con.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.status(201)
            console.log(result);
            res.json({"success":"ok"})
        }
    })
}














