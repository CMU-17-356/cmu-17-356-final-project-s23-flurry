/* eslint-disable max-len */

import { Driver } from '../../src/models/driver.js';
import { Company } from '../../src/models/company.js';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Testing Driver model', function() {
  before(function (done) {
    const c = new Company({id: 'c1', name: 'Flurry'});
    c.save().then(() => {
      done();
    }).catch(err => done(err))
  });

  it('1. Creating new driver', function(done) {
    const d = new Driver({id: 'd1', name: 'Driver', company_id: "c1"});
    d.validate().then(() => {
      expect(d.id).to.equal('d1');
      expect(d.name).to.equal('Driver');
      expect(d.company_id).to.equal('c1');
      done();
    })
    .catch(err => {
      done(new Error(`Should have passed validation, instead got ${err.message}`));
    });
  });

  it('2. Invalid if id is not alphanumeric', function(done) {
    const d = new Driver({id: 'd1 ', name: 'Driver', company_id: "c1"});
    d.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('3. Invalid if missing driver id', function(done) {
    const d = new Driver({name: 'Driver', company_id: "c1"});
    d.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('4. Invalid if referencing non-existing company id', function(done) {
    const d = new Driver({id: 'd1', name: 'Driver', company_id: "ccc"});
    d.save().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.message).to.equal(`Invalid reference in driver: no company with id ${d.company_id} found`);
      done();
    }).catch(err => done(err))
  });

  afterEach(function (done) {
    Driver.deleteMany().then(() => {
      done()
    }).catch(err => done(err))
  });

});
