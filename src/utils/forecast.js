const request=require('request')

const forecast=(city,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=018e4898874da81767023d19f4851ffd&units=metric'
request({url,json:true}, (error,{body})=>{
    // fs.writeFileSync('weather.json',JSON.stringify(response.body))
    if(error){
        callback('Unable to connect to the weather service!',undefined)
    }else if(body.message){
        callback(body.message,undefined)
    }else{
        callback(undefined,'It is currently ' + body.main.temp + ' degrees out.' + 'The high temperature is ' + body.main.temp_max + ' with a low of ' + body.main.temp_min + '. Expected ' + body.weather[0].description + '.')
    }
    
})
}
module.exports=forecast