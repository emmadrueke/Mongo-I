const express = require('express'); //importing express
const mongoose = require('mongoose');//importing mongoose
const bodyParser = require('body-parser');//parse it into JSON? 
mongoose.connect('mongodb://emmadrueke:ShitsCreek09@ds247587.mlab.com:47587/whatever')

const Users = require('./model.js');

const server = express(); //creating our server

server.use(bodyParser.json());//tells the server to use bodyParser

server.get('/', (req, res) => {
  res.status(200).json({ message: 'API Running' });
});

//-----------------------------------------------------------

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  Users.findById(id, (err, user) => {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

server.post('./users', (req, res) => {
  const { userName, userPassword } = req.body;
  if (!userName || !userPassword ) {
    res.status(422);
    res.json({ error: 'Missing username or password field' });
    return;
  }
  const user = new Users({ userName, userPassword });
  user.save((err) => {
    if (err) throw err;
    res.json(user);
  })
});

server.get('./users', (req, res) => {
  Users.find({}, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
});
// const port = 3000;
// mongoose.Promise = global.Promise;
// mongoose
//   .connect('mongodb://localhost/users', { useMongoClient: true })
//   .then( () => {
//     server.listen(port, () => {
//       console.log('Server is now listening on port: ', port);
//     });
//   })
//   .catch(err => {
//     console.log('Database Connection Failed!');
//   })
