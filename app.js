const express =require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
 });



 app.post("/",function(req,res){
    
        const query=req.body.CityName;
        const apikey="05475354404f928712a2f257256cb8dc";
        const unit="metric";
        const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apikey+"&units="+unit;


        https.get(url,function(response){
            console.log(response);
    
            response.on("data",function(data){
               const weatherData=JSON.parse(data);
              
    
               const temp=weatherData.main.temp;
               const desc=weatherData.weather[0].description;
               const icon=weatherData.weather[0].icon;
               const imageUrl=" http://openweathermap.org/img/wn/"+icon+"@2x.png";
    
               res.write("<h1> The Temperature in "+query+" is "+temp+" degree celcius </h1>");
               res.write("<p> The weather is "+desc);
               res.write("<img src="+imageUrl+">");
               res.send()
       })

    })
 })


app.listen(3000,function(){
   console.log("server is running on port 3000.");

})
