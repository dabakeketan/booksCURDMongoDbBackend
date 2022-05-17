const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
mongoose
    .connect('mongodb://localhost:27017/books')
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err.reason)
    })
const bookRoute = require('./routes/book.routes')
const app = express()
app.use(bodyParser.json())
// app.use(
//     bodyParser.urlencoded({
//         extended: false,
//     }),
// )
// app.use(cors())

app.use((req, res, next) => {
    console.log('at origin', req);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  
    next();
  });
// Static directory path
// app.use(express.static(path.join(__dirname, 'dist/angular-mean-crud-tutorial')))
// API root
app.use('/api', bookRoute)
// PORT
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Listening on port ' + port)
});
// 404 Handler
app.use((req, res, next) => {
    // next(createError(404))
    console.log(req, res, next);
});
// Base Route
app.get('/', (req, res) => {
    res.send('invaild endpoint')
});
app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'dist/angular-mean-crud-tutorial/index.html'),
    )
});
// error handler
app.use(function (err, req, res, next) {
    console.error(err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
});