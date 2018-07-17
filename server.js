var express=require('express');
var mongoose = require('mongoose');
var path =require('path');
var bodyParser=require('body-parser');
var http=require('http');
var api=require('./backend/routes/routing');
const paginate = require('express-paginate');

var app =express();
mongoose.connect('mongodb://172.10.1.7:27017/punitk', function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected to database');
 
});


app.use(paginate.middleware(4, 10));
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'frontend/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api',api);

app.get('*',function(req,res){
    //res.send("this is from express framework");
   res.sendFile(path.join(__dirname,'frontend/dist/index.html'));

});

app.listen(process.env.PORT || 8081, process.env.IP || "0.0.0.0" ,function(){
    
    console.log("server is runing")
});