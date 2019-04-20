import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.end(
        `API rest por Luis Eguia ${ new Date().getFullYear() }.`
    );
});

export default router;