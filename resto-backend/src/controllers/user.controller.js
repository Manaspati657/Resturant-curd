const con = require("../../connectionstring");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registered = (req, res) => {
  const { username, email, password } = req.body;
  if (!(email && password && username)) {
    res.status(400).send("All input is required");
  }
  const selectQuery = `select * from resturantuser where activedId=1 and email="${email}"`;
//   console.log(selectQuery);

  con.query(selectQuery, async (err, rows) => {
    if (err) {
      console.log(err);
    } else {
        console.log(rows);
      if (rows.length > 0) {
        res.send({
            "success":"User Already Exist. Please give another email",
            "register":false
        });
      } else {
        let encryptedPassword = await bcrypt.hash(password, 10);
        const userQuery = `insert into resturantuser (username,email,password,activedId,deletedId) values ("${username}","${email}","${encryptedPassword}",1,0);`;
        con.query(userQuery, async (err, result) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            // console.log(result);
           res.send({
               "success":"User Registerd successfully",
               "register":true
            })
          }
        });
      }
    }
  });
};

exports.login = (req, res) => {
    const {username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    const selectQuery = `select * from resturantuser where activedId=1 and email="${username}"`;
  //   console.log(selectQuery);
  
    con.query(selectQuery, async (err, rows) => {
      if (err) {
        console.log(err);
      } else {
          // console.log(rows);
        if (rows.length != 1) {
          res.send({
            "success":"User not found. Register first"
          });
        } else {
            // console.log(rows[0].password);
            if(await bcrypt.compare(password, rows[0].password)){
                const token = jwt.sign(
                    { user_id: Math.random() * 10, username },
                    process.env.TOKEN_KEY,
                    {
                      expiresIn: "2h",
                    }
                  );
                  rows[0].token=token;
                  rows[0].success="ok";
                  res.send({
                    "code":200,                
                    "success":"login successful", 
                    "isLoggedIn":true, 
                    "id": rows[0].id,                
                    "username": rows[0].username,                
                    "token": token                 
                  })
            }else{
                res.status(400).send({
                    "success":"Invalid Credentials",
                    "isLoggedIN":false
                });
            }
         
         
        }
      }
    });
  };
