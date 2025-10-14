import React, { Fragment, useState } from "react";
import { MdMenu } from "react-icons/md";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormInfor from "./Pages/FormInfor";
import Numerlogy from "./Pages/Numerlogy";
import AuthPage from "./Pages/AuthPage";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Fragment>
      <div className="container w-100">
        <div className="cham-logo">Chạm</div>

        <div id="root_content" style={{ position: "relative" }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/detail-number" element={<Numerlogy />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
