const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config.json');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(cors());

const db = require('knex')({
  client: config.client,
  connection: {
    host : config.connection.host,
    user : config.connection.user,
    password : config.connection.password,
    database : config.connection.database
  }
});
//set PORT=3001 && react-scripts start


// app.use(session({
//     key: 'user_sid',
//     secret: 'somerandonstuffs',
// }));

// //Middleware to clear the cookie if the user session does not exist
// app.use((req, res, next) => {
// 	if(req.cookie.user_id && !req.session.user){
// 		clearCookie('user_id');
// 	}
// 	next();
// });

// //Middleware to see if a session exists and accordingly redirect the user
// app.use((req, res, next) => {
// 	if(req.session && req.session.user){
// 		db.select('*').from('users').where('email' , '=', req.session.user.email)
// 		.returning('*')
// 		.then(user => {
// 			if(user){
// 				req.session.user = user[0];
// 			}
// 		})
// 	}
// });

app.get('/', (req, res) => {
	db.select('*').from('users').returning('*')
	.then(users => {
		//console.log(users[0]);
		res.status(200).json(users);
	}).catch(err => {
		res.status(400).json("Could not fetch users");
		console.log(err);
	})
});

app.get('/mews', (req, res) => {
	//res.status(200).json('No tweets to fetch');
	//id, username, date, mew
	db.select('*').from('mews').returning('*')
	.then(mews => {
		res.status(200).json(mews);
	});
});

app.post('/post', (req, res) => {
	//res.status(200).json('Post a tweet');
	//console.log(req.body);
	const {username, userMew} = req.body;
	db('mews').insert({
		username: username, 
		date: new Date(),
		mew: userMew
	}).returning('*')
	.then(mew => {
		res.status(200).json(mew[0]);
	}).catch(err => {
		console.log(err);
		res.status(400).json('Unable to post mew');
	});
});

app.post('/register', (req, res) => {
	// name, email, password
	const {name, email, password} = req.body;

	if(!name || !email || !password){

		return res.status(400);

	}

	const hash = bcrypt.hashSync(password);

	db.transaction(trx => {
		trx.insert({
			email: email,
			hash: hash
		}).into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users').insert({
				name: name,
				email: loginEmail[0]
			}).returning('*')
			.then(user => {
				//req.session.user = user;
				res.status(200).json(user[0]);
			}).catch(err => {
				console.log('Users table not updated', err);
			})
		}).then(trx.commit)
		.catch(trx.rollback);
	})
	.catch(err => {
		console.log('User not registered', err);
		res.status(400).json("Sorry, couldn't register");
	});

});

app.post('/signin', (req, res) => {
	const {email, password} = req.body;

	db.select('email', 'hash').from('login').where('email', '=', email).returning('*')
	.then(user => {
		// res.status(200).json(user[0]);
		const isValid = bcrypt.compareSync(password, user[0].hash);
		console.log(isValid);
		if(isValid){
			//req.session.user = user;
			res.status(200).json(user[0]);
		}else{
			res.status(400).json('Wrong Credential');
		}

	})
	.catch(err => {
		console.log('User does not exist', err);
	});

});

app.listen(3000, () => {
	console.log(`Listening on port 3000`);
});

