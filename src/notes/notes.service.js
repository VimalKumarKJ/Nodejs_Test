import fs from "fs/promises";

const FILE = 'src/notes/notes.json';

export const readNotes = async () => {
    const data = await fs.readFile(FILE, "utf8");
    return JSON.parse(data);
};

export const writeNotes = async (notes) => {
    await fs.writeFile(FILE, JSON.stringify(notes, null, 2));
};
