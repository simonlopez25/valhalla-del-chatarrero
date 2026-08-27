import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import SellersPage from "./pages/SellersPage/SellersPage";
import HomePage from "./pages/HomePage/HomePage";
import History from "./pages/History/History";
import Users from "./pages/users/Users";
import "./style/App.css";

// Páginas de ejemplo temporales

function ShowcasePage() {
  return <h2>Sección Vitrina</h2>;
}


function App() {
  return (
    <Router>
      <div className="appLayout">
        <Header />

        <main className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sellersPage" element={<SellersPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/users" element={<Users />} />
            
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
