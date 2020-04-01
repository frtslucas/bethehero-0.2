const AccessControl = require('accesscontrol');
const ac = new AccessControl();

module.exports = {
    function() {
        ac.grant('normal')
            .readAny('profile')
            .updateOwn('profile')
        
        ac.grant('ong')
            .readAny('profile')
            .updateOwn('profile')
            .updateAny('project')
            .deleteAny('project')
        
        return ac;
    }
}