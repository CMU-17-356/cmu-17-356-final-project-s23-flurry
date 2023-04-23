/* eslint-disable max-len */

import { Manager } from '../../src/models/manager.js';
import { Company } from '../../src/models/company.js';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';

describe('Testing Manager model', function() {
  before(function (done) {
    const c = new Company({id: 'c1', name: 'Flurry'});
    c.save().then(() => {
      done();
    }).catch(err => done(err))
  });

  it('1. Creating new manager', function(done) {
    const m = new Manager({id: 'm1', name: 'Admin', company_id: "c1"});
    m.validate().then(() => {
      expect(m.id).to.equal('m1');
      expect(m.name).to.equal('Admin');
      expect(m.company_id).to.equal('c1');
      done();
    })
    .catch(err => {
      done(new Error(`Should have passed validation, instead got ${err.message}`));
    });
  });

  it('2. Invalid if id is not alphanumeric', function(done) {
    const m = new Manager({id: 'm1.', name: 'Admin', company_id: "c1"});
    m.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('3. Invalid if referencing non-existing company id', function(done) {
    const m = new Manager({id: 'm1', name: 'Admin', company_id: "ccc"});
    m.save().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.message).to.equal(`Invalid reference in manager: no company with id ${m.company_id} found`);
      done();
    }).catch(err => done(err))
  });

  after(function (done) {
    Manager.deleteMany().then(() => {
      Company.deleteMany().then(() => {
        done()
      }).catch(err => done(err))
    }).catch(err => done(err))
  });
});
