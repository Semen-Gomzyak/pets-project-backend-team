const express = require('express');
const router = express.Router();
const { tryCatchWrapper } = require('../../middlwares');
const { passport, google } = require('../../controllers/auth');

router.get(
  '/google',
  tryCatchWrapper(
    passport.authenticate('google', {
      scope: ['email', 'profile'],
    }),
  ),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  google,
);

module.exports = router; 
