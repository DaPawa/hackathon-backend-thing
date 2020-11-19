'use strict';
const port = 45250

var express = require("express");
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var listings = {};
var users = {};
var sellers = {};

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var database = db.db("carbonwarriers");
    database.collection("listings").find({}).toArray(function (err, result) {
        if (err) throw err;
        listings = { result };
        db.close();
    });
});

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var database = db.db("carbonwarriers");
    database.collection("users").find({}).toArray(function (err, result) {
        if (err) throw err;
        users = { result };
        db.close();
    });
});

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var database = db.db("carbonwarriers");
    database.collection("sellers").find({}).toArray(function (err, result) {
        if (err) throw err;
        sellers = { result };
        db.close();
    });
});

app.get("/listings", (req, res) => {
    console.log("Got a request!");
    return res.send(listings);
});

app.get("/users", (req, res) => {
    console.log("Got a request!");
    return res.json(users);
});

app.get("/sellers", (req, res) => {
    console.log("Got a request!");
    return res.json(sellers);
});

app.listen(port, () => console.log(`Listening on port ${port}`));