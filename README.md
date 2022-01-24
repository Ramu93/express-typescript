This project is built with Express and Typescript.
(Please note that swagger is configured for this project but it is not working due to some issues.)

# Running the application

## Step 1

Run the following command to setup MongoDB locally using Docker.

### `docker-compose up -d`

## Step 2

Run the following command to install the dependencies.

### `npm install`

## Step 3

Run the following command to start the application.

### `npm start`

Open [http://localhost:5000](http://localhost:5000) on a REST client.
Please check for the available endpoints in the bottom of this document.

## Tests

Run the following command to run available test suites.

### `npm run test`

Test suite is available only for the users module just to showcase some of the test cases.

# Endpoints

### `http://localhost:5000/api/users`

- GET: Fetches all users with populated hobbies. Returns all the user object along with MongoDB ObjectID. Below is the sample response for this endpoint.

```
[
	{
		"hobbies": [],
		"_id": "61ee49226c5be78fa8bda257",
		"name": "Mad man",
		"__v": 0
	},
	{
		"hobbies": [],
		"_id": "61ee4d0ddc369e8fe67ca5f7",
		"name": "Ramu Ramasamy",
		"__v": 0
	}
]
```

- POST: Create a user with a request body (sample below).

```

{
"name": "Ramu Ramasamy"
}

```

Sample response for the create user:

```
{
	"hobbies": [],
	"_id": "61ee4d48dc369e8fe67ca5f8",
	"name": "Ramu Ramasamy",
	"__v": 0
}
```

### `http://localhost:5000/api/users/<id>`

- GET: Fetches the user by MongoDB ObjectID along with the user's hobbies.
- DELETE: Deletes a user with the given MongoDB ObjectID.

### `http://localhost:5000/api/hobbies`

- POST: Create a hobby with a request body (sample below). Requires userId.

```

{
"userId": <userId>,
"name":"movies",
"year":2022,
"passionLevel":"High"
}

```
Note: possible values for passionLevel - High, Very-High, Low, Medium

Sample response of create hobby endpoint:

```
{
	"_id": "61ee4e91dc369e8fe67ca5f9",
	"name": "movies",
	"year": 2022,
	"passionLevel": "High",
	"__v": 0
}
```

### `http://localhost:5000/api/hobbies/<userId>/<hobbyId>`

- DELETE: Deletes a hobby with the given MongoDB ObjectID. Also, deletes the associated hobby ID from the user document.

Sample response of delete hobby endpoint:

```
{
	"status": "success"
}
```
