const { request, response } = require("express");

exports.populateData = (dataToPopulate) => {
    return async (req = request, res = response, next) => {
        req.dataToPopulate = dataToPopulate;
        next();
    };
};