import { model } from 'mongoose';

const recordSchema = ({
  id: {
    type: String,
    required: true,
    match: /^[a-z0-9]+$/,
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

const Record = model('Record', recordSchema);
export { Record };
