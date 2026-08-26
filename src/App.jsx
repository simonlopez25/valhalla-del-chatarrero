import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import History from './pages/History/History';
import './style/App.css';

// Páginas de ejemplo temporales
function PortalPage() {
  return <h2>Sección Portal</h2>;
}
function TeamPage() {
  return <h2>Sección Equipo</h2>;
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
            <Route path="/team" element={<TeamPage />} />
            <Route path="/history" element={<History/>} />
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