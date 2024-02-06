const jwt = require('jsonwebtoken');
const Security = require('../Model/Security/Security');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Received auth token:', authHeader);

    const authToken = authHeader.replace(/^Bearer\s+/i, '');
    console.log('Received auth token:', authToken);

    if (!authToken) {
      return res.status(401).json({
        message: 'No auth token',
      });
    }
    const decoded = jwt.verify(authToken, process.env.SECURITY_SECRET_KEY);
    console.log('Decoded', decoded);

    const security = await Security.findOne({ _id: decoded.id });
    console.log('Security:', security);

    if (!security) {
      return res.status(401).json({
        message: 'Unauthorized token',
      });
    }

    req.security = security;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized access',
    });
  }
};
