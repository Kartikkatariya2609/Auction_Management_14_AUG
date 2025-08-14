import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function Chatbot() {
    const [inputValue, setInputValue] = useState('');
    const [promptResponses, setPromptResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    const genAI = new GoogleGenerativeAI("AIzaSyCt2RDUJM0dowacKGtf1nliccSvzibIzus"); // Replace with your actual key

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const getResponseForGivenPrompt = async () => {
        try {
            setLoading(true);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const result = await model.generateContent(inputValue);
            const response = result.response;
            const text = response.text();

            setPromptResponses(prev => [...prev, text]);
            setInputValue('');
        } catch (error) {
            console.error("Error during AI fetch:", error);
            alert("Something went wrong. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        setPromptResponses([]);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">AI Chatbot</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ask me something..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={getResponseForGivenPrompt}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                    Send
                </button>
                <button
                    onClick={clearChat}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
                >
                    Clear
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center text-blue-600">
                    <svg className="animate-spin h-6 w-6 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <p>Generating your answer...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {promptResponses.map((response, index) => (
                        <div
                            key={index}
                            className={`p-4 bg-gray-100 rounded-lg shadow-sm ${index === promptResponses.length - 1 ? 'border-l-4 border-blue-500' : ''}`}
                        >
                            <p className="text-gray-800 whitespace-pre-line">{response}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Chatbot;
