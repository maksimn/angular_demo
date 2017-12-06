/// <reference types="express" />
/// <reference types="body-parser" />
/// <reference types="cookie-parser" />
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import Repository from './app/repository';
import {createToken} from './app/security';
import {validateRegistrationData, validateLoginData} from './app/validation';

const app = express();
const PORT = 8000;

app.use(express.static(__dirname));
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/auth', (req, res) => {
    const authToken = req.cookies['x-auth'];

    if (authToken) {
        const repository = new Repository();

        repository.FindUserByToken(authToken).then(user => {
            if (user) {
                res.send({
                    id: user.Id,
                    name: user.Name,
                    token: authToken
                });
            } else {
                res.status(400).send();
            }
        });
    } else {
        res.status(400).send();
    }
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
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
            validationErrors.push({field: '', errorMessage: err.message});
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
                validationErrors.push({field: '', errorMessage: 'Неверное имя пользователя или пароль'});
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