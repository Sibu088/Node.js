const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// Controllers
const newPostController = require('./controllers/newPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const storePostController = require('./controllers/storePost');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

// Models
const BlogPost = require('./models/BlogPost');

// App Initialization
const app = express();
const PORT = 4000;

// Database Connection
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

// Global Variable Middleware
global.loggedIn = null;
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

// Routes
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', { blogposts });
});

app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/samplepost', (req, res) => res.render('samplepost'));

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', { blogpost });
});

// Blog Post Routes
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, async (req, res) => {
    try {
        let image = req.files.image;
        await image.mv(path.resolve(__dirname, 'public/img', image.name));
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Auth Routes
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

app.get('/auth/logout', logoutController);

// Catch-all for 404
app.use((req, res) => res.status(404).render('notfound'));

// Start Server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
