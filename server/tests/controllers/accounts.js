/* eslint-disable max-len */
import { app, server } from '../../src/index.js';
import { Driver } from '../../src/models/driver.js';
import { Manager } from '../../src/models/manager.js';
import { Company } from '../../src/models/company.js';
import { expect } from 'chai';
import { describe, it, before, after, afterEach } from 'mocha';
import request from 'supertest';

describe('Testing Accounts controller', function() {
  before(function (done) {
    const c1 = new Company({id: 'c1', name: 'Flurry'});
    const c2 = new Company({id: 'c2', name: 'Dronut'});
    c1.save().then(() => {
      c2.save().then(() => {
        done()
      }).catch(err => done(err))
    }).catch(err => done(err))
  });

  describe('Create accounts', () => {
    it('1. Valid new driver', function (done) {
      request(app)
        .post('/api/accounts?type=driver')
        .send({ id: "newdriver", name: "new driver", password: "_$%password!!!", company_id: "c2" })
        .then((res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.id).to.equal("newdriver");
            done();
        })
        .catch((err) => done(err))
    });

		it('2. Valid new manager', function (done) {
      request(app)
        .post('/api/accounts?type=manager')
        .send({ id: "newmanager", name: "new manager", password: "123!@#$%^---ok", company_id: "c2" })
        .then((res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.id).to.equal("newmanager");
            done();
        })
        .catch((err) => done(err))
    });

    it('3. Invalid new driver for duplicated id', function (done) {
			const d = new Driver({id: 'd1', name: 'Driver', company_id: "c1", password: "password"});
			d.save().then(() => {
				request(app)
					.post('/api/accounts?type=driver')
					.send({ id: "d1", name: "dup driver id", password: "newpassword", company_id: "c2" })
					.then((res) => {
							expect(res.statusCode).to.equal(400);
							expect(res.body.id).to.exist;
							done();
					})
					.catch((err) => done(err))
			}).catch((err) => done(err))
    });

    it('4. Invalid new manager for referencing non existing company id', function (done) {
      request(app)
        .post('/api/accounts?type=manager')
        .send({ id: "newmanager", name: "invalid company", password: "newpassword", company_id: "invalid" })
        .then((res) => {
					expect(res.statusCode).to.equal(400);
					expect(res.body.company_id).to.exist;
					done();
        })
        .catch((err) => done(err))
    });

		it('5. Invalid if wrong/missing type', function (done) {
      request(app)
        .post('/api/accounts?type=account')
        .send({ id: "newaccount", name: "invalid type", password: "password", company_id: "c1" })
        .then((res) => {
					expect(res.statusCode).to.equal(400);
					expect(res.body.type).to.exist;
					done();
        })
        .catch((err) => done(err))
    });
  });

	describe('Login', () => {
    it('1. Valid driver login', function (done) {
			const d = new Driver({id: 'newdriver', name: 'Driver', company_id: "c1", password: "securepassword"});
      d.save().then(() => {
			request(app)
        .post('/api/login?type=driver')
        .send({ id: "newdriver", password: "securepassword" })
        .then((res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body.id).to.equal("newdriver");
					done();
        })
        .catch((err) => done(err))
			}).catch((err) => done(err))
    });

		it('2. Valid manager login', function (done) {
			const m = new Manager({id: 'newmanager', name: 'Manager', company_id: "c2", password: "pAss?_-WoRd012"});
      m.save().then(() => {
			request(app)
        .post('/api/login?type=manager')
        .send({ id: "newmanager", password: "pAss?_-WoRd012" })
        .then((res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body.id).to.equal("newmanager");
					done();
        })
        .catch((err) => done(err))
			}).catch((err) => done(err))
    });

		it('3. Invalid driver id', function (done) {
			const d = new Driver({id: 'newdriver', name: 'Driver', company_id: "c1", password: "securepassword"});
      d.save().then(() => {
			request(app)
        .post('/api/login?type=driver')
        .send({ id: "olddriver", password: "securepassword" })
        .then((res) => {
					expect(res.statusCode).to.equal(400);
					expect(res.body.id).to.exist;
					done();
        })
        .catch((err) => done(err))
			}).catch((err) => done(err))
    });

		it('4. Invalid manager password', function (done) {
			const m = new Manager({id: 'newmanager', name: 'Manager', company_id: "c2", password: "pAss?_-WoRd012"});
      m.save().then(() => {
			request(app)
        .post('/api/login?type=manager')
        .send({ id: "newmanager", password: "pass?_-WoRd012" })
        .then((res) => {
					expect(res.statusCode).to.equal(400);
					expect(res.body.password).to.exist;
					done();
        })
        .catch((err) => done(err))
			}).catch((err) => done(err))
    });

		it('5. Invalid if wrong/missing type', function (done) {
      request(app)
        .post('/api/accounts')
        .send({ id: "newaccount", name: "missing type", password: "password", company_id: "c1" })
        .then((res) => {
					expect(res.statusCode).to.equal(400);
					expect(res.body.type).to.exist;
					done();
        })
        .catch((err) => done(err))
    });
  });

  afterEach(function (done) {
    Driver.deleteMany().then(() => {
			Manager.deleteMany().then(() => {
				done();
			}).catch(err => done(err))
		}).catch(err => done(err))        
  });
  
  after(function(done) {
    Driver.deleteMany().then(() => {
      Manager.deleteMany().then(() => {
        Company.deleteMany().then(() => {
          server.close();
          done();
        }).catch(err => done(err))
      }).catch(err => done(err))
    }).catch(err => done(err))     
  });

});