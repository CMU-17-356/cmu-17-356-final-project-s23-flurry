import { model } from 'mongoose';

const driverSchema = ({
  id: {
    type: String,
    required: true,
    match: /^[a-z0-9]+$/,
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

const Driver = model('Driver', driverSchema);
export { Driver };
