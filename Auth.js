import React, { useState } from "react";
import API from "../api";

const Auth = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isRegistering ? "/auth/register" : "/auth/login";
            const response = await API.post(endpoint, { email, password });
            if (!isRegistering) {
                localStorage.setItem("token", response.data.token);
                setIsAuthenticated(true);
            } else {
                alert("Registration successful! Please log in.");
                setIsRegistering(false);
            }
        } catch (err) {
            console.error(err.response.data.error);
            alert(err.response.data.error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">
                {isRegistering ? "Register" : "Login"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    {isRegistering ? "Register" : "Login"}
                </button>
            </form>
            <p
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-center text-blue-500 cursor-pointer mt-4"
            >
                {isRegistering
                    ? "Already have an account? Login."
                    : "Don't have an account? Register."}
            </p>
        </div>
    );
};

export default Auth;
