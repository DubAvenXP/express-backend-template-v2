const bcryptjs = require('bcryptjs');

const encriptPassword = async (req = request, res = response, next) => {
    const user = req.body;
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);
    next();
};

module.exports = {
    encriptPassword
}