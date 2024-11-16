import React from "react";

const Quote = ({ text }) => (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center max-w-md mx-auto mt-8">
        <p className="text-xl font-semibold text-gray-700 italic">"{text}"</p>
    </div>
);

export default Quote;
