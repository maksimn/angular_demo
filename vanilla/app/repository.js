const repository = {
    // List of app users
    // user schema: { id: some_id, name: some_name, password: some_password, token: some_token };
    users: [],

    addUser: function (userData) {
        return new Promise((resolve, reject) => {
            if (this.users.find(u => u.name === userData.username)) {
                reject(new Error('Это имя пользователя уже занято'));
            }

            const newUser = {
                id: this.users.length,
                name: userData.username,
                password: userData.password,
                token: null
            };
            this.users.push(newUser);
            resolve({id: newUser.id, name: newUser.name});
        });
    },

    findUserByName: function(username) {
        const user = this.users.find(u => u.name === username);
  
        if (user) {
            return Promise.resolve({id: user.id, name: user.name});
        } else {
            return Promise.resolve(null);
        }
    },

    findUserByToken: function(token) {
        const user = this.users.find(u => u.token === token);
        
        if (user) {
            return Promise.resolve({id: user.id, name: user.name}); 
        }
        
        return Promise.reject();
    },

    authenticate: function (username, password) {
        const user = this.users.find(u => u.name === username);

        if (user) {
            return Promise.resolve({id: user.id, name: user.name});
        } else {
            return Promise.resolve(null);
        }
    },

    setTokenForUser: function (user, userToken) {
        const _user = this.users.find(u => u.id === user.id);

        if (_user) {
            _user.token = userToken;
            return Promise.resolve();
        }

        return Promise.reject();
    }
};

module.exports = repository;
