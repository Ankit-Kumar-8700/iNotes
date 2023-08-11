const MongoConnect=require('./connection');
const express = require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;


MongoConnect();

app.use(cors());
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true, parameterLimit: 50000}))
app.use(express.json());
app.use('/auth',require('./routes/auth'));
app.use('/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port '${port}'`)
})