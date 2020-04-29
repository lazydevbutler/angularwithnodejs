var  Router  = require('express');
var fs = require('fs');
var path = require('path');
var databaseUsers = path.join(__dirname,'../../data/users.json');
var reportJson = path.join(__dirname,'../../data/report.json');
var moment = require('moment');
const router = Router();

router.post("/entry",(req,res,next)=>{
    var CurrentDate = moment().valueOf();

    fs.readFile(reportJson,'utf8',function(err,jsonString){
        const data = JSON.parse(jsonString);
        if(err){
            throw err;
        }
        var constructReport={
            user: req.body.user,
            details:req.body.details,
            timestamp: CurrentDate,
            approval:false,
            id:data.length+1
        }

        data.push(constructReport)
        fs.writeFile(reportJson,JSON.stringify(data,0,2),function(err,result){
            if(err){
                res.status(500).send("Error");
                throw err;
            }
            res.json("success");
            return;
        });
    })
   
    
})

router.get("/allReports",(req,res,next)=>{
  
    fs.readFile(reportJson,'utf8',function(err,jsonString){
        const data = JSON.parse(jsonString);
        if(err){
            res.status(500).send("Error");
            throw err;
        }
        res.json(data);
    
    })
})

// {
//     "username": "user",
//     "password": "user",
//     "role": "user",
//     "id": 1
// }


module.exports = router;