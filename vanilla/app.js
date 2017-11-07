const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const express = require('express');
const repository = require('./repository');
const {createToken} = require('./security');
const {
    validateRegistrationData, 
    validateLoginData
} = require('./validation');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(bodyParser.json());

const authMiddleware = (req, res, next) => {
    const authToken = req.cookies['x-auth'];
    const url = req.url;

    repository.findUserByToken(authToken).then(user => {
        const isAuthorized = true;

        if (isAuthorized && (url === '/login' || url === '/register')) {
            res.redirect('/photos');
        } else {
            next();
        }
    }).catch(() => {
        const isAuthorized = false;

        if (!isAuthorized && (url === '/photos' || url === '/profile')) {
            res.redirect('/login');
        } else {
            next();
        }
    });
};

app.get('/', (req, res) => {
    res.render('layout', { page: 'index' });
});

app.get('/login', authMiddleware, (req, res) => {
    res.render('layout', { page: 'login' });
});

app.get('/register', authMiddleware, (req, res) => {
    res.render('layout', { page: 'register' });
});

app.get('/photos', authMiddleware, (req, res) => {
    res.render('layout', { page: 'photos' });
});

app.get('/profile', authMiddleware, (req, res) => {
    res.render('layout', { page: 'profile' });
});

app.get('*', (req, res) => {
    res.render('layout', { page: 'error' });
});

app.post('/register', (req, res) => {
    const {username, password, confirmPassword} = req.body;

    const validationErrors = validateRegistrationData({
        username, password, confirmPassword
    });

    if (validationErrors.length) {
        res.status(400).send({validationErrors});
    } else {
        repository.addUser({username, password}).then(user => {
            res.status(200).send({username});
        }).catch(err => {
            validationErrors.push('Ошибка добавления пользователя');
            res.status(400).send({validationErrors});
        });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const validationErrors = validateLoginData({ username, password });

    if (validationErrors.length) {
        res.status(400).send({ validationErrors });
    } else {
        const trimUsername = username.trim();

        repository.findUserByName(trimUsername).then(user => {
            if (user && user.password === password) {
                const userToken = createToken(trimUsername);
                user.token = userToken; // does not work for a real DB

                res.status(200)
                    .header('x-auth', userToken)
                    .send({ username: trimUsername });
            } else {
                validationErrors.push('Неверное имя пользователя или пароль');
                res.status(400).send({ validationErrors });
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
