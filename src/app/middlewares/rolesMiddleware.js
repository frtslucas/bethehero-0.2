const { roles } = require('../../roles');

module.exports = {
    grantAccess (action, resource) {
        return async (request, response, next) => {
            try {
                const permission = roles.can(request.user.role)[action](resource);
                if (!permission.granted) 
                    return response.status(401).send({ error: 'Permission denied.' });
                
                next();
            } catch (err) {
                next(err);
            }
        }
    },

    allowIfLoggedIn() {
        return async (request, response, next) => {
            try {
                const user = response.locals.loggedInUser;
                if (!user)
                    return response.status(401).send({ error: 'Please log in to get access.' });
                
                request.user = user;
                next();
            } catch (err) {
                next(err);
            }
        }
    }
}