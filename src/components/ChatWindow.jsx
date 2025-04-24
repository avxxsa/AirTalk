import { useState } from "react";
import MessageBubble from "./MessageBubble";

function ChatWindow({ activeRoom }) {
  const [messagesByRoom, setMessagesByRoom] = useState({
    General: [
      { id: 1, sender: "Alisha", text: "Hello General 👋" },
      { id: 2, sender: "You", text: "Heyy" },
    ],
    "Hostel Chat": [],
    "Classroom 207": [],
  });

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: Date.now(),
      sender: "You",
      text: newMessage,
    };

    setMessagesByRoom({
      ...messagesByRoom,
      [activeRoom]: [...messagesByRoom[activeRoom], newMsg],
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col flex-1 p-4">
      <div className="text-sm font-semibold mb-2 text-gray-500">
        Room: {activeRoom}
      </div>
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow-sm">
        {messagesByRoom[activeRoom].map((msg) => (
          <MessageBubble key={msg.id} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-l"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;