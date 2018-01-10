const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Users = require('./userModel.js');

const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const user = new Users(req.body);

  user
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" , error });
    });
});

server.get('./users', (req, res) => {
  Users.find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error", error });
    });
});

server.get('./users/:id', (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user === null) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      };
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(500).json({ message: "The ID provided is invalid", error });
      } else {
        res.status(500).json({ message: "Server Error", error });
      }
    });
});

server.delete('./users', (req, res) => {
  const id = req.params.id;
  
  User.findByIdAndUpdate(id)
    .then((user) => {
      res.status(200).json({ message: "User removed successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error", error });
    });
});

server.put('./users/:id', (req,res) => {
  const id = req.params.id;
  const userInformation = req.body;

  User.findByIdAndUpdate(id, userInformation)
    .then((user) => {
      res.status(200).json({ message: "User updated successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error", error });
    });
});

server.delete('./users', (req, res) => {
  User.deleteOne(req.body)
    .then(() => {
      console.log("It worksssss");
      res.status(200).send("deleted");
    })
    .catch(() => {
      console.log("We failed miserably!");
      res.status(500).send("Failed");
    });
});

const port = 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/users', { useMongoClient: true })
  .then(function() {
    server.listen(port, function() {
      console.log('All your databses are belong to us!');
    })
  })
  .catch(function(error) {
    console.log('Database connection failed')
  });