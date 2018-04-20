// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require path
var path = require("path");
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require Mongoose
app.use(express.static(__dirname + '/client/dist'));
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// This is how we connect to the mongodb database using mongoose -- "pet" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/pet');
var PetSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required!"],
        minlength: [3, "Name must be at least 3 characters"],
        unique: true
    },
    type: {
        type: String,
        require: [true, "Type is required!"],
        minlength: [3, "Type must be at least 3 characters"]
    },
    desc: {
        type: String,
        require: [true, "Description is required!"],
        minlength: [3, "Description must be at least 3 characters"]
    },
    skill1: {
        type: String,
        default: ''
    },
    skill2: {
        type: String,
        default: ''
    },
    skill3: {
        type: String,
        default: ''
    },
    like: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
PetSchema.plugin(uniqueValidator, { message: 'This name is taken! Please try again.' });
mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet');
// Use native promises
mongoose.Promise = global.Promise;

app.get('/pets', function (req, res) {
    Pet.find({}, function (err, pets) {
        // console.log(tasks);
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err });
        } else {
            // respond with JSON
            res.json({ message: "Success", data: pets });
        };
    });
});

app.get('/pet/:id', function (req, res) {
    Pet.findOne({ _id: req.params.id }, function (err, pet) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err });
        } else {
            // respond with JSON
            res.json({ message: "Success", data: pet });
        };
    });
});

app.post('/pet/new', function (req, res) {
    var pet = new Pet(req.body);
    console.log("new pet", pet);
    // Try to save that new eagle to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    pet.save(function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong with new item save');
            res.json({ message: "Error", error: err });
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added to the DB!');
            res.json({ message: "Success", data: pet });
        };
    });
});

app.put('/pet/update', function (req, res) {
    var id = req.body._id;
    // Try to save that new item to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    Pet.update({ _id: id }, { name: req.body.name, type: req.body.type, desc: req.body.desc, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3 }, function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong with new item save');
            res.json({ message: "Error", error: err });
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully updated the DB!');
            res.json({ message: "Success" });
        };
    });
});

app.put('/like/update', function (req, res) {
    var like = req.body;
    Pet.update({ _id: like[0] }, { $set: { "like": like[1] } }, function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong with new item save');
            res.json({ message: "Error", error: err });
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully updated the DB!');
            res.json({ message: "Success" });
        };
    });
});

app.delete('/pet/remove/:id', function (req, res) {
    Pet.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log('something went wrong with save');
            res.json({ message: "Error", error: err });
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully removed record!');
            res.json({ message: "Success" });
        };
    });
});

//Catch all routing
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

// Setting our Server to Listen on Port: 8022
app.listen(8022, function () {
    console.log("listening on port 8022");
});
