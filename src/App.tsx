import React from "react";
import InfiniteScroll from "./components/InfiniteScroll";
import { PassGenerator } from "./components/PassGenerator";

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = React.useState<string>(tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={activeTab === tab.id ? "active" : ""}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{ display: activeTab === tab.id ? "block" : "none" }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const tabsData: Tab[] = [
    {
      id: "1",
      title: "Password Generator",
      content: <PassGenerator />,
    },
    {
      id: "2",
      title: "Infinite Scroll",
      content: <InfiniteScroll/>,
    },
  ];

  return <Tabs tabs={tabsData} />;
};

export default App;
