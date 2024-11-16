import React, { useState } from "react";
import API from "../api";

const AddEntry = ({ fetchEntries, onMoodChange }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("Happy");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEntry = { title, content, mood };
            await API.post("/entries", newEntry);
            fetchEntries(); 
            onMoodChange(mood); 
            setTitle("");
            setContent("");
            
        } catch (err) {
            console.error(err.response.data.error);
        }
    };

    return (
        <div className="add-entry-container bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Entry</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-lg w-full mb-4"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-lg w-full mb-4"
                    required
                />
                <div className="mb-4">
                    <select
                        value={mood}
                        onChange={(e) => {
                            setMood(e.target.value);
                            onMoodChange(e.target.value); // Update quote when mood changes
                        }}
                        className="p-3 border-2 border-gray-300 rounded-lg w-full"
                        required
                    >
                        <option value="Happy">Happy</option>
                        <option value="Neutral">Neutral</option>
                        <option value="Sad">Sad</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                    Add Entry
                </button>
            </form>
        </div>
    );
};

export default AddEntry;
