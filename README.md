## Details
This backend API is used in the Face Recognition Brain webapp, which can be found here: https://gamerkingfaiz.github.io/face-recognition-brain/  
Github: https://github.com/GamerKingFaiz/face-recognition-brain

## Geeky Details:
This API is run on Node.js in conjunction with Express.

[Knex](https://knexjs.org/) is used as the SQL Query Builder for Javascript.  
[bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) is used for hashing the passwords stored in the database.

## Endpoints
The API has 5 endpoints:
  1. ```/signin``` - Handles sign in requests
  2. ```/register``` - Handles new registrations
  3. ```/profile/:id``` - Retrieves user profile information when passing in the user's id
  4. ```/image``` - Increments the entries for the users when an image is submitted
  5. ```/imageurl``` - Calls the Clarifai (machine learning) API
