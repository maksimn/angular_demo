/// <reference types="express" />
/// <reference types="body-parser" />
/// <reference types="cookie-parser" />
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from "express";
import Repository from './app/repository';
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
    const repository = new Repository();

    repository.FindUserByToken(authToken).then(user => {
        if (user) {
            req.user = user;
        }

        if (user && (url === '/login' || url === '/register')) {
            res.redirect('/photos');
        } else if (!user && (url === '/photos' || url === '/profile')) {
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

    const repository = new Repository();

    if (validationErrors.length) {
        res.status(400).send({validationErrors});
    } else {
        repository.AddUser({username, password}).then(user => {
            res.status(200).send({id: user.Id, name: user.Name});
        }).catch(err => {
            validationErrors.push({field: null, errorMessage:'Ошибка добавления пользователя'});
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
        const repository = new Repository();

        repository.Authenticate(trimUsername, password).then(user => {
            if (user) {
                const userToken = createToken(user.Name);
                repository.SetTokenForUser(user, userToken).then(() => {
                    res.status(200)
                       .header('x-auth', userToken)
                       .send({id: user.Id, name: user.Name});
                });
            } else {
                validationErrors.push({field: null, errorMessage:'Неверное имя пользователя или пароль'});
                res.status(400).send({ validationErrors });
            }
        });
    }
});

app.post('/logout', (req, res) => {
    const authToken = req.cookies['x-auth'];
    const repository = new Repository();

    repository.RemoveToken(authToken).then(() => {
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});