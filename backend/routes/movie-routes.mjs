import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
    const filePath = 'movie/video.mp4';
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
});

export default router;
