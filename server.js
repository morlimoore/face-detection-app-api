const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profileId = require('./controllers/profileId')
const image = require('./controllers/image')
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'morlimoore',
      password : 'vikkidchamp',
      database : 'face-detection-db'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(knex.users) })

app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, knex, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })
    
app.get('/profile/:id', (req, res) => { profileId.handleProfileId(req, res, knex) })

app.put('/image', (req, res) => { image.handleImage(req, res, knex) })

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
