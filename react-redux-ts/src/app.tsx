import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import Repository from './app/repository';
import {createToken} from './app/security';
import {validateRegistrationData, validateLoginData} from './app/validation';
import Html from './client/Html';

const app = express();
const PORT = 8000;

app.use(express.static(path.resolve(__dirname, '../')));
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/auth', (req, res) => {
    const authToken = req.cookies['x-auth'];

    if (authToken) {
        const repository = new Repository();

        repository.FindUserByToken(authToken).then(user => {
            res.send({
                id: user.Id,
                name: user.Name,
                token: authToken
            });
        }).catch(err => {
            res.status(400).send();
        });
    } else {
        res.status(400).send();
    }
});

app.get('*', (req, res) => {
    const html = ReactDOMServer.renderToStaticMarkup(
        <Html
            location={ req.url }
            context={ {} } />
    );
    res.send(html);
});

app.post('/register', (req, res) => {
    const {username, password, confirmPassword} = req.body;

    const validationErrors = validateRegistrationData({
        username, password, confirmPassword
    });

    const repository = new Repository();

    if (validationErrors.errors.length) {
        res.status(400).send({validationErrors});
    } else {
        repository.AddUser({username, password}).then(user => {
            res.status(200).send({id: user.Id, name: user.Name});
        }).catch(err => {
            validationErrors.errors.push(err.message);
            res.status(400).send({validationErrors});
        });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const validationErrors = validateLoginData({ username, password });

    if (validationErrors.errors.length) {
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
                validationErrors.errors.push('Неверное имя пользователя или пароль');
                res.status(400).send({ validationErrors });
            }
        });
    }
});

app.post('/logout', (req, res) => {
    const authToken = req.cookies['x-auth'];
    const repository = new Repository();

    repository.RemoveToken(authToken).then(() => {
        res.send({ 'result': 'ok' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});