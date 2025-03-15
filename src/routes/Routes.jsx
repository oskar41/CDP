import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import WebWorkersPage from '../pages/WebWorkersPage';
import NotFoundPage from '../pages/NotFoundPage';
import IIFEPage from '../pages/IIFEPage';
import PureFunctionsPage from '../pages/PureFunctionsPage';
import LongPollingPage from '../pages/LongPollingPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/web-workers" element={<WebWorkersPage />} />
      <Route path="/iife" element={<IIFEPage />} />
      <Route path="/pure-functions" element={<PureFunctionsPage />} />
      <Route path="/long-polling" element={<LongPollingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;