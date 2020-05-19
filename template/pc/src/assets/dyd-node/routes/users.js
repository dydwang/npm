var express = require('express');
var router = express.Router();

let lmsq = require('../sql/fun/linkMSQ')
let lmdb =require('../sql/fun/linkMDB')
/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.body.$db==='mysql'){
    lmsq[req.body.$method](req.body).then(r=>{
      res.send(r)
    })
  }else{
    lmdb[req.body.$method](req.body).then(r=>{
      res.send(r)
    })
  }
});

module.exports = router;
