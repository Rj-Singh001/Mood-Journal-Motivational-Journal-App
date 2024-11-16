import React, { useState } from "react";
import API from "../api";

const EditEntry = ({ entry, fetchEntries, setIsEditing }) => {
    const [title, setTitle] = useState(entry.title);
    const [content, setContent] = useState(entry.content);
    const [mood, setMood] = useState(entry.mood);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/entries/${entry._id}`, { title, content, mood });
            fetchEntries(); // Fetch updated entries
            setIsEditing(false); // Close edit mode
        } catch (err) {
            console.error(err.response.data.error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-center mb-6">Edit Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="Happy">Happy</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Sad">Sad</option>
                </select>
                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditEntry;
