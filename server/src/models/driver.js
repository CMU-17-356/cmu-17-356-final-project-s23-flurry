import { model, Schema } from 'mongoose';
import { Company } from './company.js';

const driverSchema = Schema({
  id: {
    type: String,
    required: true,
    match: /^[A-Za-z0-9_]+$/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    match: /^[^\s]+$/,
    validate: {
      validator: function(pw) {
        return pw.length >= 8 && pw.length <= 16;
      },
      message: 'Password length must be between 8 and 16',
    },
  },
  name: {
    type: String,
    required: true,
  },
  company_id: {
    type: String,
    required: true,
  }
});

// validate referential integrity
driverSchema.post('validate', function(doc, next) {
  Company.findOne({id: doc.company_id}).then(c => {
    if (c) {
      next()
    } else {
      next(new Error(`Invalid reference in driver: no company with id ${doc.company_id} found`))
    }
  }).catch(err => next(err))
});

// validate unique id: https://mongoosejs.com/docs/middleware.html#error-handling-middleware
driverSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error(`Duplicate key in driver: id ${doc.id} already exists`));
  } else {
    next();
  }
});

const Driver = model('Driver', driverSchema);
export { Driver };
