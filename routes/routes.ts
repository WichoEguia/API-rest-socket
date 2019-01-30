import { Router } from 'express';
import Server from '../classes/Server';

const router = Router();

router.get('/', (req, res) => {
    res.end('API rest por Luis Eguia.');
});

export default router;