const AirTalkLogo = ({ isScrolled = false }) => {
  return (
    <div className="flex items-center">
      {/* Chat Bubble Logo */}
      <div className="mr-3 relative">
        {/* Main bubble */}
        <div className="w-9 h-9 bg-gradient-to-br from-[#E5989B] to-[#B5838D] rounded-full flex items-center justify-center shadow-sm">
          {/* Inner circle */}
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>

        {/* Small bubble */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F7C9C0] rounded-full"></div>

        {/* Tiny bubble */}
        <div className="absolute top-0 right-1 w-2 h-2 bg-[#FFD8D8] rounded-full"></div>
      </div>

      {/* Logo Text */}
      <div className={`text-xl font-medium tracking-wide ${
        !isScrolled 
          ? "text-white" 
          : "bg-gradient-to-r from-[#e5989b] to-[#b5838d] bg-clip-text text-transparent"
      }`}>
        AirTalk
      </div>
    </div>
  );
};

export default AirTalkLogo;