import { getNotes, setNotes, notFound } from "../controllers/notes.js";
import url from 'url';

const getUrl = (req) => {
    return new URL(req.url, `http://${req.headers.host}`);
}

const notesRouter = (req, res) => {
    const url = getUrl(req);
    const pathName = url.pathname;

    if (req.method === "GET") {
        if(pathName === "/notes") return getNotes(req, res, url);
        return notFound(req, res);
    }

    if (req.method === "POST") {
        if(pathName === "/notes") return setNotes(req, res);
    }
}

export default notesRouter;