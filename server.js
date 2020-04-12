const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profileId = require('./controllers/profileId')
const image = require('./controllers/image')
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('It is working!') })

app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
    
app.get('/profile/:id', (req, res) => { profileId.handleProfileId(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageUrl', (req, res) => { image.handleImageApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
})


// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
