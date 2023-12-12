import express from 'express';
import * as twit from '../controllers/twit.mjs';
import { controller } from '../controllers/index.mjs';
import * as auth from '../controllers/auth.mjs';

const router = new express.Router();

router.get('/', controller(twit.get));
router.post('/', auth.loginRequired, controller(twit.create));
router.put('/:id', auth.loginRequired, controller(twit.update));
router.delete('/:id', auth.loginRequired, controller(twit.remove));

export default router;