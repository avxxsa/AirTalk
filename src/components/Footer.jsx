function Footer() {
  return (
    <footer className="bg-pink-200 text-pink-800 text-center text-sm py-6 mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <p>© {new Date().getFullYear()} AirTalk — Kathmandu University</p>
        <p className="mt-1">Contact: airtalk@ku.edu.np | IG: @airtalk.ku</p>
        <div className="mt-2 text-pink-600 space-x-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;