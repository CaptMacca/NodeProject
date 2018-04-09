'use strict';

var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var eventRouter = express.Router();

eventRouter.route('/')
    .get(function(req,res){

        var url = 'mongodb://192.168.99.100:27017';
        mongodb.connect(url, function(err, client){
            if (err) {
                console.log(err);
            } else {
                var db = client.db('eventsApp');
                var collection = db.collection('events');
                collection.find({}).toArray(function(err, results){
                    console.log(results);
                    res.render('events', {
                        list: ['first event', '2nd val', '3rd val'],
                        nav: [
                            {Link: 'Services', Text: 'Services'},
                            {Link:'Portfolio', Text: 'Portfolio'},
                            {Link:'About', Text: 'About'}, 
                            {Link: 'Team', Text: 'Team'},
                            {Link: 'Contact', Text: 'Contact'},
                            {Link: 'Event', Text: 'Events'}
                        ],
                        events: results
                    });

                });
            }
        });
});

eventRouter.route('/:id')
           .get(function(req,res){
               var id = req.params.id;

               var url = 'mongodb://192.168.99.100:27017';
               mongodb.connect(url, function(err, client){
                   if (err) {
                       console.log(err);
                   } else {
                       var db = client.db('eventsApp');
                       var collection = db.collection('events');
                       collection.findOne(ObjectId(id),function(err, result){
                           if (err) {
                               console.log(err);
                           } else {
                               console.log(result);
                                res.render('event', {
                                    list: ['first event', '2nd val', '3rd val'],
                                    nav: [
                                        {Link: 'Services', Text: 'Services'},
                                        {Link:'Portfolio', Text: 'Portfolio'},
                                        {Link:'About', Text: 'About'}, 
                                        {Link: 'Team', Text: 'Team'},
                                        {Link: 'Contact', Text: 'Contact'},
                                        {Link: 'Event', Text: 'Events'}
                                    ],
                                    events: result
                                    });
                           }
                        });
                    }
            });
});

module.exports = eventRouter;