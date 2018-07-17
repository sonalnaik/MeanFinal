var express=require('express');
var router = express.Router();
const paginate = require('express-paginate');
const axios = require('axios');


var User = require('../model/user');
var Company =require('../model/company');
var Users =require('../model/company');

router.post('/login', (req, res) => { //Login function
  
  User.find({username:req.body.username,password:req.body.password},'username password',
    function(err,docs){
      if(docs != ''){
          console.log(docs);
          res.status(200).json({'res':'success','username':req.body.username,'password':req.body.password});

      }else{
        console.log(docs);
        res.status(200).json({'res':'failed'});


      }
    }
  )

});
//CRUD
//save company data
router.post('/save_company',(req,res)=>{
  var company=req.body.company;
  var contact=req.body.contact;
  var country=req.body.country;
  var company = new Company({
    company:company,
    contact:contact,
    country:country
});

company.save(function (err, results) {
  console.log(results._id);
  res.status(200).json({'res':'success'});
});

})

//get company data
router.post('/allCompany',async (req, res, next) => {
  // Company.find({},
  //   function(err,docs){
  //     console.log(docs);
  //     res.status(200).json({'res':'success',data:docs});
  //   }
  // )

   try {
 
    const [ results, itemCount ] = await Promise.all([
      Users.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
      Users.count({})
    ]);
 
    const pageCount = Math.ceil(itemCount / req.query.limit);
 
    if (req.accepts('json')) {
      // inspired by Stripe's API response for list objects
      res.json({
        object: 'list',
        has_more: paginate.hasNextPages(req)(pageCount),
        data: results
      });
    } else {
      res.render('users', {
        users: results,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
      });
    }
 
  } catch (err) {
    next(err);
  }

})


router.post('/fetchSingleCompany',(req,res)=>{
    Company.find({_id:req.body.id},
        function(err,docs){
          res.status(200).json({'res':'success',data:docs});
        }
    )
})

router.post('/updateCompany',(req,res)=>{
  Company.findByIdAndUpdate( 
    req.body.id,
    {company : req.body.company,
    contact:req.body.contact,
    country:req.body.country
    },

    {new: true},

    // the callback function
    (err, docs) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
          res.status(200).json({'res':'success',data:docs});
    }
  )
})

router.post('/deleteCompany',(req,res)=>{
  Company.findByIdAndRemove(req.body.id,(err,docs)=>{
    if(err) return res.status(500).send(err);
    res.status(200).json({'res':'success',data:docs});
  })
})

module.exports = router;