const router = require('./middleware/router');
const handlers = require('./handlers');

module.exports.setup = () => {
    router.get('/', handlers.indexHtml);
    router.get('/favicon.ico', handlers.favicon);

    /*REST API*/

    router.get('/api/users', handlers.usersCollection);
    router.get('/api/users/:id', handlers.getUser);
    router.post('/api/users', handlers.addUser);
    router.put('/api/users/:id', handlers.updateUser);
    router.delete('/api/users/:id/', handlers.removeUser);
};