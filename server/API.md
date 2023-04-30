- All API endpoints need to be prefixed with `/api`
- No authentication or session control has been implemented yet
- All endpoints may return 500 with error messages if internal server errors occurred
- Refer to [object data model](https://github.com/CMU-17-356/cmu-17-356-final-project-s23-flurry/wiki/Object-Data-Model) for JSON schema when an object is returned

### Slips

#### Create new slip: POST `/slips`
Request body:
- `id`: string (optional); if provided, has to be alphanumeric and unique; if not provided, Mongoose internal objectId will be used to fill in this field instead
- `latitude`: number; has to be in [-90, 90]
- `longitutde`: number; has to be in [-180, 180]
- `timestamp`: number representing epoch time with millisecond
- `driver_id`: string; must correspond to a valid driver id
- `slip_score`: number; has to be in [0, 100]

Response type:
- `201`: slip created successfully; a `Slip` object is returned as JSON
- `404`: validation errors have occurred; field names where errors have occurred are mapped to corresponding error messages