const { request } = require('express');
const {Schema, model } = require('mongoose')

module.exports = function (Model = model('', Schema({}))) {
    
    const get = async (req = request) => {
        let filter = req.query || {};
        filter.status = true;
        let projection = req.query.projection || {};
        let populate = req.dataToPopulate || [];
        const items = await Model.find(filter, projection).populate(populate);
        return {
            items
        };
    };

    const getOne = async (req = request) => {
        const { id } = req.params;
        const item = await Model.findById(id);
        return item;
    };

    const post = async (req = request) => {
        const { body } = req;
        const item = new Model(body);
        await item.save();
        return item;
    };

    const put = async (req = request) => {
        const { id } = req.params;
        const item = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        return item;
    };

    const remove = async (req = request) => {
        const { id } = req.params;
        const item = await Model.findByIdAndUpdate(id, { status: false }, { new: true });
        return item;
    };

    return {
        get,
        getOne,
        post,
        put,
        remove
    };
};

