import express from 'express';
import JWT from '../../config/constants/jwt';
import { verify, sign } from '../../helpers';

/*
  This route refesh JWT
*/
export default express.Router().get('/refresh', (req, res) => {

  // Set 2 new tokens + data
  let accessToken;
  let refreshToken;
  let payload;

  // Verify token based on secret
  return verify(req.query.token)
    .then((decoded) => {

      // Assign decoded data
      payload = decoded;

      // Ask for a new access token
      return sign(payload, JWT.DURATION);
    })
    .then((token) => {

      // Assign fresh token to access token
      accessToken = token;

      // Ask for a new refresh token
      return sign(payload, JWT.DURATION_REFRESH);
    })
    .then((token) => {

      // Assign fresh token to refresh token
      refreshToken = token;

      return res.status(200).json({
        success: true,
        payload: {
          accessToken,
          refreshToken,
        },
      });
    })
    .catch(error => res.status(500).json({ success: false, message: error.message }));
});
