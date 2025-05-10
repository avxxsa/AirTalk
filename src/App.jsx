import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./index.css"; // This is your global styles

function App() {
  return (
    <div className="font-sans bg-background text-foreground min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet /> {/* Page-specific components will render here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;