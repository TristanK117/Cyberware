"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
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

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Cyberware Chat</h1>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ marginRight: "1rem", padding: "0.5rem" }}
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>

      <div style={{ marginTop: "2rem" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}