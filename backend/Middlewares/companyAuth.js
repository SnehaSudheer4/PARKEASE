const jwt = require('jsonwebtoken');
const Company = require('../Model/Company/Company');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('received auth token:', authHeader);
    const authToken = authHeader.replace(/^Bearer\s+/i, '');
    console.log('Received auth token:', authToken);

    if (!authToken) {
      return res.status(401).json({
        message: 'No auth token',
      });
    }
    const decoded = jwt.verify(authToken, process.env.COMPANY_SECRET_KEY);
    console.log('Decoded', decoded);

    const company = await Company.findOne({ _id: decoded.id });
    console.log('company:', company);

    if (!company) {
      return res.status(401).json({
        message: 'Unauthorized token',
      });
    }
    req.company = company;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized access',
    });
  }
};
