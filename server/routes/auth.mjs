import express from 'express';
import * as auth from '../controllers/auth.mjs';
import { controller } from '../controllers/index.mjs';

const router = new express.Router();

router.get('/', controller(auth.getCurrent));
router.put('/', auth.loginRequired, controller(auth.edit));
router.post('/login', controller(auth.login));
router.post('/signup', controller(auth.signup));
router.put('/logout', controller(auth.logout));
router.get('/:id', controller(auth.get));


export default router;