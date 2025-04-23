function Sidebar() {
    return (
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">AirTalk</h2>
        <ul className="space-y-2">
          <li className="p-2 bg-blue-100 rounded cursor-pointer">General</li>
          <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">Hostel Chat</li>
          <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">Classroom 207</li>
        </ul>
      </div>
    );
  }
  
  export default Sidebar;  