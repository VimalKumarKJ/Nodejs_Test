import fs from 'fs/promises';

const logger = async(req, res, next) => {
    try {
        await fs.appendFile('log.txt', `${new Date().toISOString()}: [${req.method}] - ${req.url}\n`);
    } catch (error) {
        console.log(error);
    } finally {
        next();
    }
};

export default logger;