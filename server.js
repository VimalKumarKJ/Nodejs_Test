import { createServer } from 'http';
import { loadEnvFile } from 'process';
import logger from './middlewares/logger.js';
import { setJsonHead } from './middlewares/setJSONHeader.js';
import router  from './routes/homeRoutes.js';
import notesRouter from './routes/notesRoutes.js';

loadEnvFile();

const PORT = process.env.PORT;

const app = createServer((req, res) => {
    logger(req, res, () => {
        setJsonHead(req, res, () => {
            // router(req, res);
            notesRouter(req, res);
        })
    })
});

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
});
