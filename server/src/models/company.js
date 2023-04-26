import { model } from 'mongoose';

const companySchema = ({
  id: {
    type: String,
    required: true,
    match: /^[a-z0-9]+$/,
  },
  name: {
    type: String,
    required: true,
  },
});

const Company = model('Company', companySchema);
export {Company};
