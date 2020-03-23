var express = require('express');
var router = express.Router();

let lmsq = require('../sql/fun/linkMSQ')
/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.body.$db==='mysql'){
    lmsq[req.body.$method](req.body).then(r=>{
      res.send(r)
    })
  }
});

module.exports = router;
