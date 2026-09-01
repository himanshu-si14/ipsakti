import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CreatePassport from './pages/CreatePassport';
import PassportView from './pages/PassportView';
import Classification from './pages/Classification';
import IPIntelligence from './pages/IPIntelligence';
import TKAndABS from './pages/TKAndABS';
import Regulatory from './pages/Regulatory';
import MarketAccess from './pages/MarketAccess';
import EvidenceCenter from './pages/EvidenceCenter';
import ActionPlan from './pages/ActionPlan';
import ExpertReview from './pages/ExpertReview';
import RadarPage from './pages/RadarPage';
import KnowledgeMap from './pages/KnowledgeMap';
import Settings from './pages/Settings';
import Assistant from './pages/Assistant';
import ToastContainer from './components/ui/Toast';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Main app routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/passport/create" element={<CreatePassport />} />
        <Route path="/passport/:id" element={<PassportView />} />
        <Route path="/classification" element={<Classification />} />
        <Route path="/ip-intelligence" element={<IPIntelligence />} />
        <Route path="/tk-abs" element={<TKAndABS />} />
        <Route path="/regulatory" element={<Regulatory />} />
        <Route path="/market-access" element={<MarketAccess />} />
        <Route path="/evidence" element={<EvidenceCenter />} />
        <Route path="/action-plan" element={<ActionPlan />} />
        <Route path="/expert-review" element={<ExpertReview />} />
        <Route path="/radar" element={<RadarPage />} />
        <Route path="/knowledge-map" element={<KnowledgeMap />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/assistant" element={<Assistant />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
