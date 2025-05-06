import { HashRouter, Route, Routes } from "react-router";
import { IconType } from "../components/icon/Icon";
import { Sidebar } from "../components/sidebar";
import { FeedbackPage } from "./features/feedback";
import { UserSettingPage } from "./features/user-settings";

const sidebarItems: { title: string; link: string; iconType: IconType }[] = [
  { title: "User", link: "/user", iconType: "user" },
  { title: "Feedback", link: "/feedback", iconType: "feedback" },
];

function App() {
  return (
    <HashRouter>
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <main>
          <Routes>
            <Route path="/" element={<UserSettingPage />} />
            <Route path="/user" element={<UserSettingPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
