import { useState } from "react";
import UserNumerologyHeader from "../component/DailyAdvice/UserNumerologyHeader";
import PageNavigationMenu from "../component/DailyAdvice/PageNavigationMenu";
import TodoListComponent from "../component/DailyAdvice/TodoListComponent";
import "./TodoListPage.css";

export default function TodoListPage() {
  const [targetDate] = useState(new Date());

  return (
    <div className="daily-advice-page">
      <div className="daily-advice-container">
        {/* HEADER & NAV */}
        <UserNumerologyHeader />
        <PageNavigationMenu />

        {/* TODO LIST COMPONENT */}
        <div className="da-todo-container">
          <TodoListComponent
            period="custom"
            targetDate={targetDate}
          />
        </div>
      </div>
    </div>
  );
}
