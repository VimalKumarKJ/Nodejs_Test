import { getHome, setHomeText, getHealth, echoPing, notFound } from "../controllers/home.js";
import url from 'url';

const getUrl = (req) => {
    return new URL(req.url, `http://${req.headers.host}`);
}

const router = (req, res) => {
  const url = getUrl(req);
  const pathName = url.pathname;
  if (req.method === "GET") {
    switch(pathName){
        case "/home":
            return getHome(req, res);
        case "/health":
            return getHealth(req, res);
        case "/echo":
            return echoPing(req, res, url.searchParams.get('msg'))
    }
    return notFound(req, res);
  }
  if (req.method === "POST") {
    if (req.url === "/home/text") return setHomeText(req, res);
    return notFound(req, res);
  }
  return notFound(req, res);
};

export default router;
