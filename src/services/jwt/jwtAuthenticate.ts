import BaseError from '../../utils/BaseError';
import { HttpStatusCode } from '../../utils/ErrorStatusCode';

const jwt = require('jsonwebtoken');

// Middleware kiểm tra JWT
export function authenticateJWT(req: any, res: any, next: any) {
    const token = req.header('Authorization');
    console.log(token);
    try {
        if (!token) {
            throw new BaseError(401, 'fail', 'No JWT');
            // return res.status(401).json({ message: 'Không có JWT' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
            if (err) {
                console.log(err);

                throw new BaseError(403, 'fail', 'JWT Invalid. Error: ' + err);
                // return res.status(403).json({ message: 'JWT không hợp lệ' });
            }
            req.user = user;
            next();
        });
    } catch (error: any) {
        next(error);
    }
}
