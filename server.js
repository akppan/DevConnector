const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json);

//DB Config
const db = require('./config/keys').mongoURI;

//connect to mongoDB
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// mongoose.connection.on('error',()=>{
//     throw new Error('unable to connect to database');
// })

app.get('/',(req,res) => {
    res.send('Hello!');
});

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);


const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`listening to port ${port}`));