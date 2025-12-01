import React, { Fragment, useState } from "react";
import { MdMenu } from "react-icons/md";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import FormInfor from "./Pages/FormInfor";
import Numerlogy from "./Pages/Numerlogy";
import AuthPage from "./Pages/AuthPage";
import SignupPage from "./Pages/SignupPage";
import NameInputPage from "./Pages/NameInputPage";
import BirthDatePage from "./Pages/BirthDatePage";
import GenderSelectionPage from "./Pages/GenderSelectionPage";
import JobInputPage from "./Pages/JobInputPage";
import AboutPage from "./Pages/AboutPage";
import DailyAdvicePage from "./Pages/DailyAdvicePage";
import TodoListPage from "./Pages/TodoListPage";
import NumerologyDetailPage from "./Pages/NumerologyDetailPage";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Fragment>
      <div className="container w-100">
        {/* <div className="cham-logo">Chạm</div> */}

        <div id="root_content" style={{ position: "relative" }}>
          <BrowserRouter>
            <Routes>
              {/* Public routes - không cần authentication */}
              <Route path="/" element={<AuthPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected routes - cần authentication */}
              <Route 
                path="/name-input" 
                element={
                  <ProtectedRoute>
                    <NameInputPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/birth-date" 
                element={
                  <ProtectedRoute>
                    <BirthDatePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/gender-selection" 
                element={
                  <ProtectedRoute>
                    <GenderSelectionPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/job-input" 
                element={
                  <ProtectedRoute>
                    <JobInputPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <ProtectedRoute>
                    <AboutPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/daily-advice" 
                element={
                  <ProtectedRoute>
                    <DailyAdvicePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/todo-list" 
                element={
                  <ProtectedRoute>
                    <TodoListPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/numerology-detail" 
                element={
                  <ProtectedRoute>
                    <NumerologyDetailPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/detail-number" 
                element={
                  <ProtectedRoute>
                    <Numerlogy />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/form-infor" 
                element={
                  <ProtectedRoute>
                    <FormInfor />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
