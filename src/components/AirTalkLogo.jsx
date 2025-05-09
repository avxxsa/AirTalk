const AirTalkLogo = () => {
  return (
    <div className="flex items-center">
      {/* Custom Icon */}
      <div className="mr-2 relative">
        <div className="w-8 h-8 bg-[#E5989B] rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F7C9C0] rounded-full"></div>
      </div>

      {/* Logo Text with Custom Font */}
      <div className="logo-text text-xl font-medium tracking-wide">AirTalk</div>

      {/* Envelope Icon */}
      <span className="ml-1 text-xl">💌</span>
    </div>
  )
}

export default AirTalkLogo;