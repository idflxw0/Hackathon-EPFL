import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import SignIn from "./pages/auth/SignIn";
import EnterCode from "./pages/auth/EnterCode";
import Documentation from "./pages/LandingPage/Documentation";
import Privacy from "./pages/LandingPage/Privacy";
import Terms from "./pages/LandingPage/Terms";
import Contact from "./pages/LandingPage/Contact";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/enter-code" element={<EnterCode />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
