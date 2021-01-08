var express=require('express');
var app=express();
var mongo=require('mongodb');
var url='mongodb://localhost:27017/';

app.post('/update',function(req,res){
    try{
        mongo.MongoClient.connect(url,{useUnifiedTopology:true},function(err,connected){
            if(err) throw err;
            console.log("connected");
            var dataBase=connected.db('mydb');
            dataBase.collection('users').find({email:req.body.params.email}).toArray(function(err,result){
                if (err) throw err;
                var query={email:req.body.params.email};
                let newValues={$set:{email:req.body.params.email,
                                     firstname:req.body.params.firstname,
                                    surname:req.body.params.surname,
                                    password:req.body.params.password}};
                if(result.length>0){
                    dataBase.collection('users').updateOne(query,newValues,function(err,data){
                        if(err) throw err;
                        res.send({code:200,message:"updated successfully"});
                    })
                }else{
                    res.send({code:202,message:"not updated"});
                }
            });
        });

    }catch(e){
        res.send({code:404,message:"sorry something went wrong"});
    }
});

module.exports=app