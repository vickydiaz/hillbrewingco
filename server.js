const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload'); 
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


// Route files
const recipes = require('./routes/recipes');
const auth = require('./routes/auth');
const categories = require('./routes/categories');

// Load env config file
dotenv.config({ path: './config/config.env'});

// Connect Database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if(process.env.NODE_ENV='development'){
    app.use(morgan('dev'));
}

// File upload
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent xss attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());


// Set react as static page
app.use(express.static(path.join(__dirname, 'client', 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'client', 'public', 'index.html'));
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }

    next();
})

// Mount routers
app.use('/api/recipes', recipes);
app.use('/api/auth', auth);
app.use('/api/categories', categories);

// app.get('/', function(req, res){
//     res.cookie('token', 'newCookie', { maxAge: 360000, httpOnly: true }).send('cookie set');
//  });

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running port ${PORT}`));

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);

    // Close server and exit process 
    server.close(() => process.exit(1));   
});