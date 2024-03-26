import React from "react";

type HistoryProps = {
  allClicks: any;
};

const History: React.FC<HistoryProps> = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {allClicks.join(" ")}</div>;
};
export default History;
