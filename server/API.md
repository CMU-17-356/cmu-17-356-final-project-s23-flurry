- All API endpoints need to be prefixed with `/api`
- No password hashing, authentication or session control has been implemented yet
- All values are **case-sensitive**
- All endpoints may return 500 with error messages if internal server errors occurred
- Refer to [object data model](https://github.com/CMU-17-356/cmu-17-356-final-project-s23-flurry/wiki/Object-Data-Model) for JSON schema when an object is returned


### Slips

#### Get all slips: GET `/slips?before=...&after=...&company_id=...`
Query parameters (all optional):
- `before` and `after`: epoch time as a number; filter by latest and earliest date range (inclusive)
- `company_id`: string; filter by company associated with the driver of that slip, must corresponding to a valid company id

Response type:
- `200`: return a list of `Slip` objects

#### Get a slip by id: GET `/slips/:id`
Response type:
- `200`: return a `Slip` object
- `404`: no slip with the given id found

#### Create new slip: POST `/slips`
Request body:
- `id`: string (optional); if provided, has to be alphanumeric or underscore and unique; if not provided, Mongoose internal objectId will be used to fill in this field instead
- `latitude`: number; has to be in [-90, 90]
- `longitutde`: number; has to be in [-180, 180]
- `timestamp`: number representing epoch time with millisecond
- `driver_id`: string; must correspond to a valid driver id
- `slip_score`: number; has to be in [0, 100]

Response type:
- `201`: slip created successfully; a `Slip` object is returned as JSON
- `400`: validation errors have occurred; field names where errors have occurred are mapped to corresponding error messages


### Drivers

#### Get all drivers: GET `/drivers?company_id=...`
Query parameters (all optional):
- `company_id`: string; filter by associated company, must corresponding to a valid company id

Response type:
- `200`: return a list of `Driver` objects

#### Get a driver by id: GET `/drivers/:id`
Response type:
- `200`: return a `Driver` object
- `404`: no driver with the given id found


### Managers

#### Get a manager by id: GET `/managers/:id`
Response type:
- `200`: return a `Manager` object
- `404`: no manager with the given id found


### Accounts

#### Create new account: POST `/accounts?type={manager, driver}`
Request body:
- `id`: string; has to be alphanumeric or underscore and unique
- `password`: string; cannot contain space characters, has to have length between 8 and 16
- `name`: string
- `company_id`: string; must correspond to a valid company id

Response type:
- `201`: user created successfully; a `Manager` or `Driver` object is returned as JSON
- `400`: validation errors have occurred; field names where errors have occurred are mapped to corresponding error messages
- `404`: invalid query param `type`

#### Login: POST `/login?type={maanger, driver}`
Request body:
- `id`: string
- `password`: string

Response type:
- `200`: login successful; the corresponding `Manager` or `Driver` object is returned as JSON
- `400`: either invalid id (if not found) or invalid password (if doesn't match given id)
- `404`: invalid query param `type`
