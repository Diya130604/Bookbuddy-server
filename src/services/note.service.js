import { Notes } from "../model/note.model.js";

class NoteServices {
    async createNotes(body, user) {
        const { _id } = user;

        const data = await Notes.create({
            user: _id,
            title: body.title,
            message: body.message,
            date: body.date,
            tags: body.tags,
            mood: body.mood,
        });
        return data;
    }

    async update(body, params, user) {
        const { id } = user;
        const { noteId } = params;
        let note = await Notes.findById(noteId);
        if (!note) {
            throw new Error("That is not a valid note");
        }
        note = await Notes.findByIdAndUpdate(
            { _id: noteId },
            { $set: { title: body.title, message: body.message } },
            { new: true }
        );
        return note;
    }

    async deleteNote(params) {
        const { noteId } = params;
        const note = await Notes.findById(noteId);
        if (note) {
            await Notes.findByIdAndDelete(noteId);
        }
        return note;
    }

    async fetch(user) {
        const { _id } = user;
        console.log(_id);

        const data = await Notes.find({ user: _id });

        return data;
    }

    async fetchById(params) {
        const { noteId } = params;
        const data = await Notes.findById(noteId);

        return data;
    }
}

export default new NoteServices();
