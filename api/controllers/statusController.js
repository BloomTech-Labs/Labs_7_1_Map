const user = require ('../models/user');

module.exports = {
  handle_status: async (req, res) => {
    try {
      res.status(200).json(req.body);
      console.log(req.body);
    } catch (err) {
      res.status(399).json({message: 'there was an error!'})
    }
  }
};