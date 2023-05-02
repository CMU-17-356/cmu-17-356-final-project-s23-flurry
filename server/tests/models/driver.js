/* eslint-disable max-len */

import { Driver } from '../../src/models/driver.js';
import { Company } from '../../src/models/company.js';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';

describe('Testing Driver model', function() {
  before(function (done) {
    const c = new Company({id: 'c1', name: 'Flurry'});
    c.save().then(() => {
      done();
    }).catch(err => done(err))
  });

  it('1. Creating new driver', function(done) {
    const d = new Driver({id: 'd_D1', name: 'Driver', company_id: "c1", password: "password"});
    d.validate().then(() => {
      expect(d.id).to.equal('d_D1');
      expect(d.name).to.equal('Driver');
      expect(d.company_id).to.equal('c1');
      done();
    })
    .catch(err => {
      done(new Error(`Should have passed validation, instead got ${err.message}`));
    });
  });

  it('2. Invalid if id is not alphanumeric or underscore', function(done) {
    const d = new Driver({id: 'd1 ', name: 'Driver', company_id: "c1", password: "password"});
    d.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('3. Invalid if missing driver id', function(done) {
    const d = new Driver({name: 'Driver', company_id: "c1", password: "password"});
    d.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('4. Invalid if referencing non-existing company id', function(done) {
    const d = new Driver({id: 'd1', name: 'Driver', company_id: "ccc", password: "password"});
    d.save().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.message).to.equal(`Invalid reference in driver: no company with id ${d.company_id} found`);
      done();
    }).catch(err => done(err))
  });

  it('5. Invalid if password contains space characters', function(done) {
    const d = new Driver({name: 'Driver', company_id: "c1", password: "pass word"});
    d.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.password).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('6. Invalid if password length not in range', function(done) {
    const d = new Driver({name: 'Driver', company_id: "c1", password: "secure"});
    d.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.password).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('7. Invalid if duplicate id', function(done) {
    const d1 = new Driver({id: 'd1', name: 'Driver', company_id: "c1", password: "password"});
    const d2 = new Driver({id: 'd1', name: 'Driver (2)', company_id: "c1", password: "password2"});
    d1.save().then(() => {
      d2.save().then(() => done(new Error("Should have failed to save")))
      .catch(err => {
        expect(err.message).to.equal(`Duplicate key in driver: id ${d1.id} already exists`);
        done();
      }).catch(err => done(err))
    }).catch(err => done(err))
  });

  after(function (done) {
    Driver.deleteMany().then(() => {
      Company.deleteMany().then(() => {
        done()
      }).catch(err => done(err))
    }).catch(err => done(err))
  });

});
