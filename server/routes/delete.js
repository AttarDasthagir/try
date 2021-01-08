var express= require('express');
var app= express();

var mongo=require('mongodb');
var url='mongodb://localhost:27017/';

app.post('/delete/',function(req,res){
//connecting to mongodb database(mydb)
    try{
        mongo.MongoClient.connect(url,{useUnifiedTopology:true},function(err,connected){
            if (err) console.log(err);
            console.log("connected");
            var dataBase=connected.db('mydb');
            dataBase.collection('users').find({email:req.body.params.email}).toArray(function(err,result){
                if(err) console.log(err);
                console.log(result);
                if(result.length){
                 dataBase.collection('users').deleteOne(req.body.params,function(err,data){
                    if (err) console.log(err);
                        res.send({code:200,message:" deleted successfully"});
                })
                 }  //else{
                //     res.send({code:202,message:"email already exists"});
                // }
               
            })
    })

    }catch(e){
        res.send({code:404,message:"something went wrong"});
    }
    })

module.exports=app