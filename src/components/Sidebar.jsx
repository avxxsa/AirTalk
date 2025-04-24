function Sidebar({ activeRoom, setActiveRoom }) {
  const rooms = ["General", "Hostel Chat", "Classroom 207"];

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">AirTalk</h2>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li
            key={room}
            className={`p-2 rounded cursor-pointer ${
              activeRoom === room ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveRoom(room)}
          >
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
