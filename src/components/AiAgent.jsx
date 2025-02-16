import React, { useState } from "react";
import axios from "axios";

const AiAgent = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]); // Stores chat history
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiEndpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
  const apiKey = "AIzaSyBl_NrJxtB5xxS86vI3pqaWab2E09SNNyc";

  async function sendMessage() {
    console.log("loading...");
    if (!inputMessage.trim()) return;
    setLoading(true);

    const newMessages = [...messages, { sender: "user", text: inputMessage }];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        `${apiEndpoint}?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: inputMessage }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const aiResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI.";

      setMessages([...newMessages, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages([
        ...newMessages,
        { sender: "ai", text: "Error fetching response." },
      ]);
    } finally {
      setLoading(false);
      setInputMessage("");
    }
  }

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        ></div>
      )}

      <div className={`drawer drawer-end ${isOpen ? "open" : ""} z-50`}>
        <input
          id="ai-agent-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          readOnly
        />

        <div className="drawer-side">
          <label htmlFor="ai-agent-drawer" className="drawer-overlay"></label>
          <div className="p-4 w-96 bg-zinc-800 text-white min-h-full relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-red-400"
            >
              ✖
            </button>
            <h2 className="font-semibold text-lg mb-4">AI Chat Assistant</h2>

            <div className="h-[82vh] overflow-y-auto p-2 bg-zinc-700 rounded-md">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded-md ${
                    msg.sender === "user"
                      ? "bg-purple-500 text-white self-end ml-auto max-w-[75%]"
                      : "bg-gray-600 text-white max-w-[75%]"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                type="text"
                className="w-full p-2 rounded-md bg-zinc-700 text-white"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className={`py-2 px-3 bg-purple-600 text-white rounded-md ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple-500"
                }`}
                disabled={loading}
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAgent;
