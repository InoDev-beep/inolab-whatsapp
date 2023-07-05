import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());

app.post('/ultramsgwebhook', (req, res) => {
    console.log(req.body) // print all response
    //messageFrom=req.body['data']['from'] // sender number
    //messageMsg=req.body['data']['body'] // Message text
    res.status(200).end()
  })
  


export default app;