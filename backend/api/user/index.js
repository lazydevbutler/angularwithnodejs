var  Router  = require('express');
var fs = require('fs');
var path = require('path');
var databaseUsers = path.join(__dirname,'../../data/users.json');

const router = Router();

router.post("/authenticate",(req,res,next)=>{
    
    // console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;



    // res.status(200).send("success");
    fs.readFile(databaseUsers,'utf8',function(err,jsonString){
        const data = JSON.parse(jsonString);
        if(err){
            throw err;
        }

        for(var item in data){
            if(username===data[item].username && password ===data[item].password){
                console.log("Found user: "+ data[item].username);
                res.status(200).send(data[item]);
                return;
            }
            console.log(data[item])
        }
      
        
        // console.log(data);

        res.status(404).send("error");
    })
    // res.status(200).send("succeed");
})
// {
//     "username": "user",
//     "password": "user",
//     "role": "user",
//     "id": 1
// }

router.post("/register",(req,res,next)=>{
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    fs.readFile(databaseUsers,'utf8',function(err,jsonString){
        const data = JSON.parse(jsonString);
        if(err){
            throw err;
        }
        var register_data = {
            "username":username,
            "password":password,
            "role":"user",
            "id": data.length+1,
        }
    

        for(var item in data){
            if(username===data[item].username){
                console.log("User exists")
                res.status(409).send("User exists");
                return;
            }
        }

        data.push(register_data)
        fs.writeFile(databaseUsers,JSON.stringify(data,0,2),function(err,result){
            res.json("success");
            return;
        });
    })
})

router.get("/fail",(req,res,next)=>{
    res.status(500).send("fail");
})


module.exports = router;