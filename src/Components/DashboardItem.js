import React from "react";
import Card from "../Shared/UIElements/Card";
import "./DashboardItem.css";

const DashboardItem = (props) => {

  return (
    <React.Fragment>
      <Card className="dashboard-item" onClick={props.onClick}>
        <div className={`coloured-line ${props.color}`}></div>
        <div className="dashboard-item-content">
          <div>{props.header}</div>
          <div className="dashboard-count">{props.count}</div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default DashboardItem;
