var Router =  require('express');

const router = Router();

router.use('/api/',require('./api'));

router.get('/*',function(req,res){
    res.status(404).send("Api not found");
})

module.exports = router;