
import express from 'express';

import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

const router = express.Router();

router.get(
    '/dashboard',
    protect,
    authorize('admin'),
    (req, res) => {

        res.status(200).json({
            success: true,
            message: `Welcome to Admin Dashboard, ${req.user.name}`,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        });

    }
);

export default router;
