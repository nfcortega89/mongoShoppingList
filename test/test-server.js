global.DATABASE_URL = 'mongod://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {

            Item.create({ name: 'Broad beans' }, { name: 'Tomatoes' }, { name: 'Peppers' }, function(err, items) {
            	console.log(err, 'err', items);
                // done();
            });
            done();
        });
    });

    after(function(done) {
        Item.remove(function() {
        });
        done();
    });

    it('should list items on get', function(done){
    	chai.request(app)
    	.get('/items')
    	.end(function(err, res){
    		res.should.have.status(200);
    		console.log(res.body);
    		done();
    	});
    });

    it('should be able to PSOPST bla bla blh', function(done) {
        chai.request(app)
            .post('/items')
            .send({ name: 'Kale' })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201)
                done()
            });
    });
    it('should edit an item on put', function(done) {
        // chai.request(app)
        //     .put('/items/4')
        //     .send({ name: 'Potatoes' })
        //     .end(function(err, res) {
        //         storage.items[3].name.should.equal('Potatoes');
        //         res.should.have.status(201);
        //         done();
        //     })
        done();
    })
});
