import UserDataInput from './models/UserDataInput';
import User from './models/User';

export default class Repository {
    private static users: User[] = [];

    private static NextUserId() : number {
        return Repository.users.length;
    }

    AddUser(userData: UserDataInput) : Promise<User> {
        return new Promise((
                resolve : (user : User) => void, 
                reject: (err: Error) => void
        ) => {
            this.FindUserByName(userData.username).then(user => {
                if (user) {
                    reject(new Error('Это имя пользователя уже занято'));
                } else {
                    const newUser = new User(
                        Repository.NextUserId(),
                        userData.username,
                        userData.password,
                        null
                    );
                    Repository.users.push(newUser);
                    resolve(newUser);
                }
            });
        });
    }

    FindUserByName(username: string): Promise<User> {
        return this.FindUser(u => u.Name === username);
    }

    FindUserByToken(token: string): Promise<User> {
        return this.FindUser(u => u.Token === token);
    }

    FindUser(predicate: (user: User) => boolean): Promise<User> {
        const user = Repository.users.find(predicate);

        return Promise.resolve(user);
    }

    Authenticate(username: string, password: string): Promise<User> {
        return new Promise(resolve => {
            this.FindUserByName(username).then(user => {
                if (user && user.ComparePasswords(password)) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    }

    SetTokenForUser(user: User, token: string): Promise<null> {
        user.Token = token;
        return Promise.resolve(null);
    }

    RemoveToken(token: string): Promise<void> {
        return new Promise(resolve => {
            this.FindUserByToken(token).then(user => {
                if (user) {
                    user.Token = null;
                }
                resolve();
            });
        });
    }
}
