const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response){
    response.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    console.log(req.body);
    var num1=parseFloat(req.body.num1);
    var num2=parseFloat(req.body.num2);
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+ num1+"&lon="+num2+"&appid=f7cb98d204ea0ccb2a0db0c9652f62fa"
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
           const weatherData= JSON.parse(data)
            console.log(weatherData);
             const temp=weatherData.main.temp;
             const windSpeed=weatherData.wind.speed;
             const weathe=weatherData.weather[0].description;
             const cityName=weatherData.name;
            res.write("<p>the weather is</P>" +weathe);
            res.write("<P>the temprature is </P>"+temp+"K");
            res.write("<p> the wind speed is</p>"+windSpeed)
            res.write("<p>the city name is</p>"+" "+cityName);

            
   
});












    
            
            
                  })
    })
    


app.listen(3001, function(){
    console.log("Server is running on port 3001");
})