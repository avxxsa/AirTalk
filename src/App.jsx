import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [activeRoom, setActiveRoom] = useState("General");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
      <ChatWindow activeRoom={activeRoom} />
    </div>
  );
}

export default App;