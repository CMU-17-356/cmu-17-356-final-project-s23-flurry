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
    const m = new Manager({id: 'm_M1', name: 'Admin', company_id: "c1", password: "password"});
    m.validate().then(() => {
      expect(m.id).to.equal('m_M1');
      expect(m.name).to.equal('Admin');
      expect(m.company_id).to.equal('c1');
      done();
    })
    .catch(err => {
      done(new Error(`Should have passed validation, instead got ${err.message}`));
    });
  });

  it('2. Invalid if id is not alphanumeric or underscore', function(done) {
    const m = new Manager({id: 'm1.', name: 'Admin', company_id: "c1", password: "password"});
    m.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('3. Invalid if missing manager id', function(done) {
    const m = new Manager({name: 'Admin', company_id: "c1", password: "password"});
    m.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('4. Invalid if referencing non-existing company id', function(done) {
    const m = new Manager({id: 'm1', name: 'Admin', company_id: "ccc", password: "password"});
    m.save().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.message).to.equal(`Invalid reference in manager: no company with id ${m.company_id} found`);
      done();
    }).catch(err => done(err))
  });

  it('5. Invalid if password contains space characters', function(done) {
    const m = new Manager({id: 'm1', name: 'Admin', company_id: "c1", password: "pass word"});
    m.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.password).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('6. Invalid if password length not in range', function(done) {
    const m = new Manager({id: 'm1', name: 'Admin', company_id: "c1", password: "extremelysecure!!!"});
    m.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.password).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('7. Invalid if duplicate id', function(done) {
    const m1 = new Manager({id: 'm1', name: 'Admin', company_id: "c1", password: "password"});
    const m2 = new Manager({id: 'm1', name: 'Admin (2)', company_id: "c1", password: "password2"});
    m1.save().then(() => {
      m2.save().then(() => done(new Error("Should have failed to save")))
      .catch(err => {
        expect(err.message).to.equal(`Duplicate key in manager: id ${m1.id} already exists`);
        done();
      }).catch(err => done(err))
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
