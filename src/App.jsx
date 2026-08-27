import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import { Footer } from './components/footer/Footer';
import HomePage from './pages/homePage/HomePage';
import History from './pages/history/History';
import SellersPage from './pages/sellersPage/SellersPage';
import ShowcasePage from './pages/showcase/ShowcasePage';
import Users from './pages/users/Users';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="appLayout">
        <Header />

        <main className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<History />} />
            <Route path="/sellersPage" element={<SellersPage />} />
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
