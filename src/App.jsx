import React, { Fragment, useState } from "react";
import { MdMenu } from "react-icons/md";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormInfor from "./Pages/FormInfor";
import Numerlogy from "./Pages/Numerlogy";
import AuthPage from "./Pages/AuthPage";
import SignupPage from "./Pages/SignupPage";
import NameInputPage from "./Pages/NameInputPage";
import BirthDatePage from "./Pages/BirthDatePage";
import GenderSelectionPage from "./Pages/GenderSelectionPage";
import JobInputPage from "./Pages/JobInputPage";
import AboutPage from "./Pages/AboutPage";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Fragment>
      <div className="container w-100">
        {/* <div className="cham-logo">Chạm</div> */}

        <div id="root_content" style={{ position: "relative" }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/name-input" element={<NameInputPage />} />
            <Route path="/birth-date" element={<BirthDatePage />} />
            <Route path="/gender-selection" element={<GenderSelectionPage />} />
            <Route path="/job-input" element={<JobInputPage />} />
            <Route path="/about" element={<AboutPage />} />
              <Route path="/detail-number" element={<Numerlogy />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
