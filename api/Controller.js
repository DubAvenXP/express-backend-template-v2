const { err, success } = require('../helpers');

module.exports = function (Model) {
  const service = require('../database/methods')(Model);

  async function list(req, res) {
    try {
      const result = await service.get(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500, 'Internal server error, contact the administrator');
    }
  }

  async function listOne(req, res) {
    try {
      const result = await service.getOne(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500, 'Internal server error, contact the administrator');
    }
  }

  async function add(req, res) {
    try {
      const result = await service.post(req);
      success(req, res, result, 201);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500, 'Internal server error, contact the administrator');
    }
  }

  async function update(req, res) {
    try {
      const result = await service.put(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500, 'Internal server error, contact the administrator');
    }
  }

  async function remove(req, res) {
    try {
      const result = await service.remove(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500, 'Internal server error, contact the administrator');
    }
  }

  return {
    list,
    listOne,
    add,
    update,
    remove,
  };
};

