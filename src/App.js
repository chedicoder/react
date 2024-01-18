import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterPage from './components/Register';
import SignIn from './components/SignIn';
import ManageUsers from './components/table_admin';
import WelcomePage from './components/Welcome';
import ConfirmationPage from './components/fail_confirm';
import ApprovePage from './components/fail_approve';
import ProjectForm from './components/project_add';
import ProjectsPage from './components/project_admin';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/Welcome" element={< WelcomePage />} />
      <Route path="/administrator" element={<ManageUsers />} />
      <Route path="/projects" element={<ProjectForm />} />
      <Route path="/proj_admin" element={<ProjectsPage />} />
      <Route path="/fail1" element={<ConfirmationPage />} />
      <Route path="/fail2" element={<ApprovePage />} />
      </Routes>
    </Router>
  );
}

export default App;
