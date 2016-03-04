const router = require('./middleware/router');
const handlers = require('./handlers');

module.exports.setup = () => {
    router.get('/', handlers.indexHtml);
    router.get('/favicon.ico', handlers.favicon);

    /*API*/

    router.get('/api/users', handlers.usersCollection);
    router.post('/api/users', handlers.addUser);
    router.delete('/api/users/:id', handlers.removeUser);
};