function MessageBubble({ sender, text }) {
    const isMe = sender === "You";
  
    return (
      <div
        className={`mb-2 flex ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`px-4 py-2 max-w-xs rounded-lg shadow-sm ${
            isMe
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-gray-800 rounded-bl-none"
          }`}
        >
          <p className="text-sm">
            <span className="font-semibold mr-1">[{sender}]:</span>
            {text}
          </p>
        </div>
      </div>
    );
  }
  
  export default MessageBubble;  