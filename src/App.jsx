import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import SellersPage from './pages/SellersPage/SellersPage';
import './style/App.css';

// Páginas de ejemplo temporales
function PortalPage() {
  return <h2>Sección Portal</h2>;
}

function HistoryPage() {
  return <h2>Sección Historia</h2>;
}
function ShowcasePage() {
  return <h2>Sección Vitrina</h2>;
}
function UsersPage() {
  return <h2>Sección Usuarios</h2>;
}

function App() {
  return (
    <Router>
      <div className="appLayout">
        <Header />

        <main className="mainContent">
          <Routes>
            <Route path="/" element={<PortalPage />} />
            <Route path="/sellersPage" element={<SellersPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;