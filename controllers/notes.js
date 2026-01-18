import { read } from "fs";
import { readNotes, writeNotes } from "../src/notes/notes.service.js";

const setJson = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.end(JSON.stringify(payload));
};

export const getNotes = async (req, res, url) => {
  try {
    const pageSize = Number(url.searchParams.get("page"));
    const limit = Number(url.searchParams.get("limit"));

    const notes = await readNotes();
    const paginated = notes;
    if (pageSize && limit) {
      const start = pageSize - 1 * limit;
      paginated = notes.slice(start, start + limit);
    }
    return setJson(res, 200, {
      pageSize,
      limit,
      total: notes.length,
      data: paginated,
    });
  } catch (error) {
    return setJson(res, 400, { error: "Invalid JSON" });
  }
};

export const setNotes = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const { text } = JSON.parse(body);
      console.log(text);

      if (!text) return setJson(res, 400, { msg: "bad request" });

      const notes = await readNotes();

      const newNote = {
        id: new Date(),
        text: text,
      };
      notes.push(newNote);

      await writeNotes(notes);
      return setJson(res, 201, newNote);
    } catch (error) {
      return setJson(res, 400, { error: "Invalid JSON" });
    }
  });

  req.on("error", () => {
    return setJson(res, 400, { msg: "bad request" });
  });
};

export const notFound = (req, res) => {
  return setJson(res, 404, { message: "Page not found" });
};
