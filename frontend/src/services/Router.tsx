import HomePage from '@/pages/HomeView';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function RoutesPage() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default RoutesPage;
