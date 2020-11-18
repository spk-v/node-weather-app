const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const forecast=require('./utils/forecast')

const port=process.env.PORT || 3000
//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static Directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'SPK',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'SPK'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        message:'This is a Help message',
        name:'SPK'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.city){
        return res.send({
            error:'You must provide a city'
        })
    }
    forecast(req.query.city,(error,data)=>{
        if(error==undefined){
            return res.send({
                forecast:data,
                location:req.query.city
            })
        }
        res.send({
            error
        })
        
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('page404',{
        title:'404',
        message:'Help article not found.',
        name:'SPK'
    })
})

app.get('*',(req,res)=>{
    res.render('page404',{
        title:'404',
        message:'Page not found.',
        name:'SPK'
    })
})

app.listen(port,()=>{
    console.log('server is running at port ' + port)
})