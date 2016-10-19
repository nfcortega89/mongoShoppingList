// require express
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Item = require('./models/item');
var config = require('./config');

var app = express();

// use bodyParser to handle request bodies
app.use(bodyParser.json()); // middleware; traps the "request"
// parse?up here...!!
// static middleware to server static assets
app.use(express.static('public'));

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }
        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback()
            }
        });
    });
};
// used to make this file both an executable script and a module
if (require.main == module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

app.get('/items', function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

app.post('/items', function(req, res) {
    Item.create({
        name: req.body.name
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

app.put('/items/:id', function(req, res) {
    Item.update({_id: req.params.id}, {name: req.body.name}, function(err, item) {
        if (err) {
            return res.status(500).json({
            });
        }
        res.status(201).json(item);
    });
});

app.get('/items/:id', function(req, res){
	Item.findOne({_id: req.params.id}, function(err, item){
		if (err){
			return res.status(500).json({
				message: 'Item not found'
			});
		}
		res.json(item);
	});
});

app.delete('/items/:id', function(req, res){
	Item.remove({_id: req.params.id}, function(err, item){
		if(err){
			return res.status(500).json({
				message: 'Internal Server Error'
			});
		}
		res.status(201).json(item)
	});
});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
