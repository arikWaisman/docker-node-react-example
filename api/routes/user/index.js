const { Router } = require('express');
const { signIn, isLoggedIn } = require('../../controllers/user');

const requireSignIn = require('../../middleware/require_sign_in');

const router = Router();

router.post('/signin', requireSignIn, signIn);
router.get('/logged_in', isLoggedIn);

module.exports = router;
