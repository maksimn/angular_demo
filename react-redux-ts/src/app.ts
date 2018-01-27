import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import { createStore } from 'redux';

import reducers from './client/reducers';
import { authActionCreators } from './client/actions/authorization';
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

app.get('*', (req, res) => {
    const authToken = req.cookies['x-auth'];
    const store = createStore(reducers);

    if (authToken) {
        const repository = new Repository();

        repository.FindUserByToken(authToken).then(user => {
            const userView = {
                id: user.Id,
                name: user.Name,
                token: authToken
            };
            store.dispatch(authActionCreators.authSuccess(userView));
            res.send(Html(req.url, {}, store.getState()));
        }).catch(err => {
            res.send(Html(req.url, {}, store.getState()));
        });
    } else {
        res.send(Html(req.url, {}, store.getState()));
    }
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