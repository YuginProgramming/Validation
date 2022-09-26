const express = require('express');
const upload = require('multer')();
const server = express();
const validMw = require('./validation/valid');

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./static'));

server.get('/', (req, res) => {
    res.render('main');
})

server.post('/test', upload.none(), validMw({

    type: 'object',
      properties: {
        Name: {
          type: 'string'},
        Data: {
          type: 'string'},
        BirthDay: { 
          type: 'string',
          format: 'date',
          formatMinimum: '1900-01-01',
          formatExclusiveMaximum: '2016-01-01'
        },
        Email: {
          type: 'string',
          format: 'email'
        },
      },
      required: ['Name', 'BirthDay'],
      additionalProperties: false,
}), (req, res) => {
  
    // res.end();
}); 

server.listen(3000);