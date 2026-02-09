import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Start from "./pages/Start";
import OnboardingStep1 from "./pages/OnboardingStep1";
import OnboardingStep2 from "./pages/OnboardingStep2";
import OnboardingStep3 from './pages/OnboardingStep3';
import OnboardingStep4 from './pages/OnboardingStep4';
import OnboardingStep5 from './pages/OnboardingStep5';
import HomePage from './pages/HomePage';
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetails";
import Nutrition from "./pages/Nutrition"; // Добавьте этот импорт
import Health from "./pages/Health";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/onboarding/1" element={<OnboardingStep1 />} />
          <Route path="/onboarding/2" element={<OnboardingStep2 />} />
          <Route path="/onboarding/3" element={<OnboardingStep3 />} />
          <Route path="/onboarding/4" element={<OnboardingStep4 />} />
          <Route path="/onboarding/5" element={<OnboardingStep5 />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />
          <Route path="/nutrition" element={<Nutrition />} /> 
          <Route path="/health" element={<Health />} />
          {/* Редирект на главную для неизвестных путей */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;