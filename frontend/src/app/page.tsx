"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error(error);
      setResponse("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Cyberware Chat
        </h1>

        <textarea
          className="w-full border rounded-md p-2 mb-4 text-black"
          rows={4}
          placeholder="Ask a cybersecurity question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {response && (
          <div className="mt-6 p-4 border rounded-md bg-gray-50">
            <strong>Response:</strong>
            <p className="mt-2">{response}</p>
          </div>
        )}
      </div>
    </main>
  );
}