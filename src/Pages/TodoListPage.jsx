import { useState, useEffect } from "react";
import UserNumerologyHeader from "../component/DailyAdvice/UserNumerologyHeader";
import PageNavigationMenu from "../component/DailyAdvice/PageNavigationMenu";
import TodoListComponent from "../component/DailyAdvice/TodoListComponent";

export default function TodoListPage() {
  const [targetDate] = useState(new Date());

  return (
    <div 
      className="min-vh-100 p-3"
      style={{
        background: "#FDFBF6",
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(232, 199, 140, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(232, 199, 140, 0.05) 0%, transparent 50%)
        `
      }}
    >
      {/* Background astrological elements */}
      <div className="position-absolute w-100 h-100" style={{ pointerEvents: 'none', top: 0, left: 0 }}>
        {/* Stars and constellations */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="position-absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: '#E8C78C',
              borderRadius: '50%',
              opacity: 0.2 + Math.random() * 0.3
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7">
            {/* Header */}
            <UserNumerologyHeader />
            
            {/* Page Navigation Menu */}
            <PageNavigationMenu />

            {/* TODO List Component */}
            <div className="mt-4">
              <TodoListComponent 
                period="custom"
                targetDate={targetDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

