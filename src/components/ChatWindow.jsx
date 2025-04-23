function ChatWindow() {
    return (
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow-sm">
          <p className="mb-2 text-sm text-gray-600">[Alisha]: Hello! 👋</p>
          <p className="mb-2 text-sm text-blue-600 text-right">[You]: Heyyy! 😄</p>
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-l"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    );
  }
  
  export default ChatWindow;  