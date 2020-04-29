var Router = require('express');
var fs = require('fs');
var path = require('path');
var databaseUsers = path.join(__dirname, '../../data/users.json');
var reportJson = path.join(__dirname, '../../data/report.json');
var moment = require('moment');
const router = Router();

router.post("/entry", (req, res, next) => {
    var CurrentDate = moment().valueOf();

    fs.readFile(reportJson, 'utf8', function (err, jsonString) {
        const data = JSON.parse(jsonString);
        if (err) {
            throw err;
        }
        console.log(data)
        var constructReport = {
            username: req.body.user,
            details: req.body.details,
            timestamp: CurrentDate,
            approval: false,
            id: data.slice(-1)[0].id + 1
        }
        console.log(constructReport);

        data.push(constructReport)
        fs.writeFile(reportJson, JSON.stringify(data, 0, 2), function (err, result) {
            if (err) {
                res.status(500).send("Error");
                throw err;
            }
            res.json("success");
            return;
        });
    })


})

router.get("/allReports", (req, res, next) => {

    fs.readFile(reportJson, 'utf8', function (err, jsonString) {
        const data = JSON.parse(jsonString);
        if (err) {
            res.status(500).send("Error");
            throw err;
        }

        
        res.json(data);

    })
})

router.get("/approvedReports", (req, res, next) => {

    fs.readFile(reportJson, 'utf8', function (err, jsonString) {
        const data = JSON.parse(jsonString);
        if (err) {
            res.status(500).send("Error");
            throw err;
        }
        var newData= []
        for(item in data){
            if(data[item].approval == true){
                newData.push(data[item])
            }
        }
        if(newData.length!=0){
        res.json(newData);
        }
        else{
            res.status(500).send("Error");
        }

    })
})

router.get("/getReport/:id",(req,res,next)=>{
    const id = req.params.id
    fs.readFile(reportJson, 'utf8', function (err, jsonString) {
        const data = JSON.parse(jsonString);
        if (err) {
            res.status(500).send("Error");
            throw err;
        }

        for(item in data){
            if(data[item].id == id){
                res.json(data[item])
                return;
            }
        }
        res.status(500).send("Error")
    })
   
})

router.get("/getAllMyReport/:id",(req,res,next)=>{
    const id = req.params.id//user id
    fs.readFile(databaseUsers,'utf8',function(err,jsonString){
        const data = JSON.parse(jsonString);
        if (err) {
            res.status(500).send("Error");
            throw err;
        }

        var newData=[];

        //search list of users
        new Promise(function(resolve,reject){
            for(item in data){
                if(data[item].id == id){
                    resolve(data[item].username)
                    
                }
            }
        }).then(function(username){
            fs.readFile(reportJson,'utf8',function(err,jsonString){
                const data2 = JSON.parse(jsonString);
                if(err){
                    res.status(500).send("Error");
                    throw err;
                }
                for(item in data2){
                    // console.log(data2[item]);
                    if(data2[item].username == username){
                        newData.push(data2[item]);
                    }
                }
    
            if(newData.length!=0){
                res.json(newData);
            }
            else{
                res.json(newData)
            }
    
            })
        })
    })
})



router.post("/deleteSelectedReports", (req, res, next) => {
    // console.log(req.body)
    var selectedData = req.body.rows
    // console.log(selectedData)
    fs.readFile(reportJson, 'utf8', function (err, jsonString) {
        var data = JSON.parse(jsonString);
        if (err) {
            res.status(500).send("Error")
            throw err;
        }

        data = data.filter(function (val) {
            for (var item in selectedData) {
                if (selectedData[item].id === val.id) {
                    return false;
                }

            }
            return true;
        });
        fs.writeFile(reportJson, JSON.stringify(data, 0, 2), function (err, result) {
            if (err) {
                res.status(500).send("Error");
                throw err;
            }
            res.json("success");
            return;
        });
        console.log(data);

    })
})

router.post("/approveSelectedReports",(req,res,next)=>{
    var selectedData = req.body.rows;
    var CurrentDate = moment().valueOf();
    console.log(selectedData)
    fs.readFile(reportJson, 'utf8', function (err, jsonString) {
        var data = JSON.parse(jsonString);
        if (err) {
            res.status(500).send("Error")
            throw err;
        }
        
        for(item in data){
            for(approveItems in selectedData){
                if(data[item].id === selectedData[approveItems].id){
                    data[item].approval = true;
                    data[item].timestamp = CurrentDate
                }
            }
        }
        fs.writeFile(reportJson, JSON.stringify(data, 0, 2), function (err, result) {
            if (err) {
                res.status(500).send("Error");
                throw err;
            }
            res.json("success");
            return;
        });


    })
})


router.post("/unapproveSelectedReports",(req,res,next)=>{
    var selectedData = req.body.rows
    console.log(selectedData)
    fs.readFile(reportJson, 'utf8', function (err, jsonString) {
        var data = JSON.parse(jsonString);
        if (err) {
            res.status(500).send("Error")
            throw err;
        }
        
        for(item in data){
            for(approveItems in selectedData){
                if(data[item].id === selectedData[approveItems].id){
                    data[item].approval = false;
                }
            }
        }
        fs.writeFile(reportJson, JSON.stringify(data, 0, 2), function (err, result) {
            if (err) {
                res.status(500).send("Error");
                throw err;
            }
            res.json("success");
            return;
        });


    })
})


module.exports = router;