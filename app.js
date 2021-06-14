const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const query=req.body.cityName;
  https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=31ba97fbcd3f280bc9562eaa81f1de4a&units=metric",function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
     const weatherData = JSON.parse(data);
     console.log(weatherData);
     const temp=weatherData.main.temp;
     const icon="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
     console.log("Today's temp is "+temp+"but it feels like"+weatherData.main.feels_like);
     res.write("<h1> The weather seems like it is "+weatherData.main.feels_like+"degree celcius</h1>");
     res.write("<h1>The temperature in "+query+" is "+temp+"</h1>");
     res.write("<img src="+icon+">");
     res.send();
   });
  });
})

app.listen(3000,function(){
  console.log("Server running at port 3000");
})
