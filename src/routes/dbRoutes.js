'use strict';

var express = require('express');
var dbRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var eventsData = [  {
    name: 'Event 1',
    description: 'The First Event',
    date: '2016.01.01',
    time: '1:00 PM',
    duration: '1 hour',
    location: {
        streetAddr: '101 Main St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '87885',
        lon: 0,
        lat: 0
        },
    capacity: 100
    },
    {
    name: 'Event 2',
    description: 'The Second Event',
    date: '2016.02.02',
    time: '2:00 PM',
    duration: '2 hours',
    location: {
        streetAddr: '202 Main St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '87885',
        lon: 0,
        lat: 0
        },
    capacity: 200
    },
    {
    name: 'Event 3',
    description: 'The Third Event',
    date: '2016.03.03',
    time: '3:00 PM',
    duration: '3 hours',
    location: {
        streetAddr: '303 Main St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '87885',
        lon: 0,
        lat: 0
        },
    capacity: 300
    },
    {
        name: 'Event 4',
        description: 'The Fourth Event',
        date: '2016.04.04',
        time: '4:00 PM',
        duration: '4 hours',
        location: {
            streetAddr: '404 Main St',
            city: 'Los Angeles',
            state: 'CA',
            zip: '87885',
            lon: 0,
            lat: 0
            },
        capacity: 400
    }
];

dbRouter.route('/AddEventData')
    .get(function(req,res){
        var url = 'mongodb://192.168.99.100:27017';
        mongodb.connect(url, function(err, client){
            if (err) {
                console.log(err);
            } else {
                var db = client.db('eventsApp');
                var collection = db.collection('events');
                collection.insertMany(eventsData, function(err, results){
                    res.send(results);
                    client.close();
                });
            }
        });
});

module.exports = dbRouter;