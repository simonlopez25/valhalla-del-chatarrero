import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import './style/App.css';

// Páginas de ejemplo temporales
function PortalPage() {
  return <h2>Sección Portal</h2>;
}
function TeamPage() {
  return <h2>Sección Equipo</h2>;
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
        {/* Tu nuevo Header profesional integrado */}
        <Header />

        {/* Contenido principal que cambiará según la ruta del Navbar */}
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<PortalPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;