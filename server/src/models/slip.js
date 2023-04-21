import { model, Schema } from 'mongoose';
import { Driver } from './driver.js';

const slipSchema = Schema({
  id: {
    type: String,
    required: true,
    match: /^[a-z0-9]+$/,
    unique: true,
  },
  latitude: {
    type: Number,
    required: true,
    validate: {
      validator: function(l) {
        return l >= -90 && l <= 90;
      },
      message: 'Latitude must be a number between -90 and +90',
    },
  },
  longitude: {
    type: Number,
    required: true,
    validate: {
      validator: function(l) {
        return l >= -180 && l <= 180;
      },
      message: 'Longitude must be a number between -180 and +180',
    },
  },
  timestamp: {
    type: Date,
    required: true,
  },
  driver_id: {
    type: String,
    required: true,
  },
  slip_score: {
    type: Number,
    required: true,
    validate: {
      validator: function(s) {
        return s >= 0 && s <= 100;
      },
      message: 'Slip score must be a number between 0 and 100',
    },
  },
});

// validate referential integrity
slipSchema.post('validate', function(doc, next) {
  Driver.findOne({id: doc.driver_id}).then(d => {
    if (d) {
      next()
    } else {
      next(new Error(`Invalid reference: no driver with id ${doc.driver_id} found`))
    }
  }).catch(err => next(err))
});

// validate unique id: https://mongoosejs.com/docs/middleware.html#error-handling-middleware
slipSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error(`Duplicate key: id ${doc.id} already exists`));
  } else {
    next();
  }
});

const Slip = model('Slip', slipSchema);

export { Slip };
