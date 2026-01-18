export const setJsonHead = (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'application/json');
    } catch (error) {
        console.log(error);
    } finally {
        next();
    }
};