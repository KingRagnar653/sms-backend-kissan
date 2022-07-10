const express = require('express')
const cors = require('cors');
const twilio = require('twilio')('ACafa9ae5b94cfe23617bcd71b7a9bae16','8753505bd2c1396dbbcd1e5f501a0708')

const app = express()
const port =8080


app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.listen(process.env.PORT || port, () => console.log(`Hello world app listening on port ${port}!`))


function sendMessage (details){
    return new Promise((resolve,reject)=>{
        twilio.messages.create({
            body:details.message,
            from:"+19794757795",
            to:details.phoneno
        })
        .then(res=>{
            resolve({
                status:200,
                messages:"message is send",
                res,
            })
        })
        .catch(error=>{
            reject ({
                status:404,
                messages:"something went wrong",
                error
            })
        })
    })
}
app.post('/send',(req,res)=>{
    console.log(req.body)
    sendMessage(req.body)
    .then(data=>{
        res.json(data)
    })
    .catch(error=>{
        res.json(error)
    })
})

app.get('/',(req,res)=>{
    const details ={
        message:"hello"
    }
    res.json(details)
})
