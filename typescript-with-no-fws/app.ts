/// <reference types="express" />
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

import * as express from "express";
import repository from './app/repository';
import {createToken} from './app/security';
import {validateRegistrationData, validateLoginData} from './app/validation';

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
        req.user = user;

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
    res.render('layout', { page: 'index', user: null });
});

app.get('/login', authMiddleware, (req, res) => {
    res.render('layout', { page: 'login', user: null });
});

app.get('/register', authMiddleware, (req, res) => {
    res.render('layout', { page: 'register', user: null });
});

app.get('/photos', authMiddleware, (req, res) => {
    res.render('layout', { page: 'photos', user: req['user'] });
});

app.get('/profile', authMiddleware, (req, res) => {
    res.render('layout', { page: 'profile', user: req['user'] });
});

app.get('*', (req, res) => {
    res.render('layout', { page: 'error', user: req['user'] });
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
            res.status(200).send(user);
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

        repository.authenticate(trimUsername, password).then(user => {
            if (user) {
                const userToken = createToken(user);
                repository.setTokenForUser(user, userToken).then(() => {
                    res.status(200)
                       .header('x-auth', userToken)
                       .send(user);
                }).catch(() => {
                    validationErrors.push('Произошла ошибка. Попробуйте ещё раз');
                    res.status(400).send({ validationErrors });
                });
            } else {
                validationErrors.push('Неверное имя пользователя или пароль');
                res.status(400).send({ validationErrors });
            }
        });
    }
});

app.post('/logout', (req, res) => {
    const authToken = req.cookies['x-auth'];

    repository.removeToken(authToken).then(() => {
        res.redirect('/');
    }).catch(() => {
        res.redirect('/error');
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});