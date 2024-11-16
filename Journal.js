import React, { useEffect, useState } from "react";
import API from "../api";
import AddEntry from "./AddEntry";
import EditEntry from "./EditEntry";
import Quote from "./Quote"; 

const Journal = ({ setIsAuthenticated }) => {
    const [entries, setEntries] = useState([]);
    const [isEditing, setIsEditing] = useState(false); 
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const [mood, setMood] = useState("Happy"); 

    const fetchEntries = async () => {
        try {
            const response = await API.get("/entries");
            setEntries(response.data);
        } catch (err) {
            console.error(err.response.data.error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleEdit = (entry) => {
        setSelectedEntry(entry);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/entries/${id}`);
            fetchEntries(); 
        } catch (err) {
            console.error(err.response.data.error);
        }
    };

    const filteredEntries = entries.filter(
        (entry) =>
            (!filter || entry.mood === filter) &&
            (!search || entry.title.includes(search) || entry.content.includes(search))
    );

    // Quotes for different moods
    const getQuoteByMood = (mood) => {
        switch (mood) {
            case "Happy":
                return "Believe in yourself!";
            case "Neutral":
                return "Every day is a fresh start.";
            case "Sad":
                return "It's okay to not be okay.";
            default:
                return "Stay strong!";
        }
    };

    
    const handleMoodChange = (selectedMood) => {
        setMood(selectedMood); 
    };

    return (
        <div className="container mx-auto px-4 py-8">
            
            <div className="text-center mb-8">
                <Quote text={getQuoteByMood(mood)} />
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Your Journal</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            <AddEntry fetchEntries={fetchEntries} onMoodChange={handleMoodChange} />

            {isEditing ? (
                <EditEntry entry={selectedEntry} fetchEntries={fetchEntries} setIsEditing={setIsEditing} />
            ) : (
                <>
                    <div className="filters flex gap-4 mb-6">
                        <select
                            onChange={(e) => setFilter(e.target.value)}
                            className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Moods</option>
                            <option value="Happy">Happy</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Sad">Sad</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Search entries..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <ul className="space-y-6">
                        {filteredEntries.map((entry) => (
                            <li key={entry._id} className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-800">{entry.title}</h3>
                                <p className="text-gray-600 mt-2">{entry.content}</p>
                                <small className="block text-gray-500 mt-2">
                                    {entry.mood} - {new Date(entry.date).toLocaleString()}
                                </small>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={() => handleEdit(entry)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(entry._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Journal;
