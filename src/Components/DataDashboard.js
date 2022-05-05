import React, { useState, useEffect } from "react";
import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";

import TriageNav from "./Triage/TriageNav";
import Card from "../Shared/UIElements/Card";
import "./DataDashboard.css";

const DataDashboard = () => {
  const [allData, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await axios({
        method: "GET",
        url: "/ticket",
      });

      setData(res.data);
      let complaintArr = [];
      let feedbackArr = [];
      let appealArr = [];
      res.data.map((ticket) => {
        if (ticket.TicketType === "Complaint") {
          complaintArr.push(ticket);
        } else if (ticket.TicketType === "Feedback") {
          feedbackArr.push(ticket);
        } else {
          appealArr.push(ticket);
        }
        return 0;
      });
    }

    fetchData();
  }, []);

  const [yearComplaintData, setYearComplaintData] = useState();
  const [yearFeedbackData, setYearFeedbackData] = useState();
  const [yearAppealData, setYearAppealData] = useState();
  const [stackData, setStackData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Complaint",
        data: yearComplaintData,
        backgroundColor: "rgb(231, 76, 60)",
        stack: "Stack 0",
      },
      {
        label: "Feedback",
        data: yearFeedbackData,
        backgroundColor: "rgb(41, 128, 185)",
        stack: "Stack 0",
      },
      {
        label: "Appeal",
        data: yearAppealData,
        backgroundColor: "rgb(39, 174, 96)",
        stack: "Stack 0",
      },
    ],
  });

  useEffect(() => {
    setStackData({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Complaint",
          data: yearComplaintData,
          backgroundColor: "rgb(231, 76, 60)",
          borderColor: "rgb(231, 76, 60)",
          stack: "Stack 0",
        },
        {
          label: "Feedback",
          data: yearFeedbackData,
          backgroundColor: "rgb(41, 128, 185)",
          borderColor: "rgb(41, 128, 185)",
          stack: "Stack 0",
        },
        {
          label: "Appeal",
          data: yearAppealData,
          backgroundColor: "rgb(39, 174, 96)",
          borderColor: "rgb(39, 174, 96)",
          stack: "Stack 0",
        },
      ],
    });
  }, [yearComplaintData, yearFeedbackData, yearAppealData]);

  const [monthComplaintData, setMonthComplaintData] = useState();
  const [monthFeedbackData, setMonthFeedbackData] = useState();
  const [monthAppealData, setMonthAppealData] = useState();
  const [chartData, setChartData] = useState({
    labels: ["Complaint", "Feedback", "Appeal"],
    datasets: [
      {
        label: "Total Tickets",
        data: [12, 19, 11],
        backgroundColor: [
          "rgba(231, 76, 60, 1)",
          "rgba(41, 128, 185, 1)",
          "rgba(39, 174, 96, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: ["Complaint", "Feedback", "Appeal"],
      datasets: [
        {
          label: "Total Tickets",
          data: [monthComplaintData, monthFeedbackData, monthAppealData],
          backgroundColor: [
            "rgba(231, 76, 60, 1)",
            "rgba(41, 128, 185, 1)",
            "rgba(39, 174, 96, 1)",
          ],
          borderWidth: 1,
        },
        {
          options: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem, data) {
                  const value =
                    data["datasets"][0]["data"][tooltipItem["index"]];
                  return value === -1 ? 0 : value;
                },
              },
            },
          },
        },
      ],
    });
  }, [monthComplaintData, monthFeedbackData, monthAppealData]);

  // Saving state for Pie Data
  const [complaintCount, setDeptComplaintCount] = useState();
  const [feedbackCount, setDeptFeedbackCount] = useState();
  const [appealCount, setDeptAppealCount] = useState();
  const [facilityCount, setDeptFacilityCount] = useState();
  const [affairCount, setDeptAffairCount] = useState();
  const [adminCount, setDeptAdminCount] = useState();
  const [hrCount, setDeptHRCount] = useState();
  const [unassignedCount, setUnassignedCount] = useState();
  const [pieData, setPieData] = useState({
    labels: [
      "Complaint",
      "Feedback",
      "Appeal",
      "Facilities",
      "General Affairs",
      "Administration",
      "Human Resources",
      "Unassigned",
    ],
    datasets: [
      {
        label: "Department's Ticket",
        data: [
          complaintCount,
          feedbackCount,
          appealCount,
          facilityCount,
          affairCount,
          adminCount,
          hrCount,
          unassignedCount,
        ],
        backgroundColor: [
          "rgba(231, 76, 60, 1)",
          "rgba(41, 128, 185, 1)",
          "rgba(39, 174, 96, 1)",
          "rgba(240, 147, 43, 1)",
          "rgba(106, 176, 76, 1)",
          "rgba(223, 249, 251, 1)",
          "rgba(190, 46, 221, 1)",
          "rgba(83, 92, 104, 1)",
        ],
        borderColor: [
          "rgba(231, 76, 60, 1)",
          "rgba(41, 128, 185, 1)",
          "rgba(39, 174, 96, 1)",
          "rgba(240, 147, 43, 1)",
          "rgba(106, 176, 76, 1)",
          "rgba(223, 249, 251, 1)",
          "rgba(190, 46, 221, 1)",
          "rgba(83, 92, 104, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setPieData({
      labels: [
        "Complaint",
        "Feedback",
        "Appeal",
        "Facilities",
        "General Affairs",
        "Administration",
        "Human Resources",
        "Unassigned",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [
            complaintCount,
            feedbackCount,
            appealCount,
            facilityCount,
            affairCount,
            adminCount,
            hrCount,
            unassignedCount,
          ],
          backgroundColor: [
            "rgba(231, 76, 60, 1)",
            "rgba(41, 128, 185, 1)",
            "rgba(39, 174, 96, 1)",
            "rgba(240, 147, 43, 1)",
            "rgba(106, 176, 76, 1)",
            "rgba(223, 249, 251, 1)",
            "rgba(190, 46, 221, 1)",
            "rgba(83, 92, 104, 1)",
          ],
          borderColor: [
            "rgba(231, 76, 60, 1)",
            "rgba(41, 128, 185, 1)",
            "rgba(39, 174, 96, 1)",
            "rgba(240, 147, 43, 1)",
            "rgba(106, 176, 76, 1)",
            "rgba(223, 249, 251, 1)",
            "rgba(190, 46, 221, 1)",
            "rgba(83, 92, 104, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [
    complaintCount,
    feedbackCount,
    appealCount,
    facilityCount,
    affairCount,
    adminCount,
    hrCount,
    unassignedCount,
  ]);

  const yearChangeHandler = () => {
    let year = document.getElementById("select-bar-year");
    let selectedYear = year.options[year.selectedIndex].value;

    let selectedYearComplaintData = new Array(12).fill(0);
    let selectedYearFeedbackData = new Array(12).fill(0);
    let selectedYearAppealData = new Array(12).fill(0);

    if (allData) {
      allData.map((ticket) => {
        let ticketDate = ticket.TicketDate.split("T")[0];
        if (ticketDate.split("-")[0] === selectedYear) {
          switch (ticketDate.split("-")[1]) {
            case "01":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[0] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[0] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[0] += 1;
              break;
            case "02":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[1] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[1] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[1] += 1;
              break;
            case "03":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[2] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[2] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[2] += 1;
              break;
            case "04":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[3] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[3] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[3] += 1;
              break;
            case "05":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[4] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[4] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[4] += 1;
              break;
            case "06":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[5] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[5] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[5] += 1;
              break;
            case "07":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[6] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[6] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[6] += 1;
              break;
            case "08":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[7] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[7] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[7] += 1;
              break;
            case "09":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[8] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[8] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[8] += 1;
              break;
            case "10":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[9] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[9] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[9] += 1;
              break;
            case "11":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[10] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[10] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[10] += 1;
              break;
            case "12":
              if (ticket.TicketType === "Complaint")
                selectedYearComplaintData[11] += 1;
              else if (ticket.TicketType === "Feedback")
                selectedYearFeedbackData[11] += 1;
              else if (ticket.TicketType === "Appeal")
                selectedYearAppealData[11] += 1;
              break;
            default:
              break;
          }
        }
        return 0;
      });
    }
    setYearComplaintData(selectedYearComplaintData);
    setYearFeedbackData(selectedYearFeedbackData);
    setYearAppealData(selectedYearAppealData);
  };

  const chartChangeHandler = () => {
    let year = document.getElementById("select-chart-year");
    let selectedYear = year.options[year.selectedIndex].value;

    let month = document.getElementById("select-chart-month");
    let selectedMonth = month.options[month.selectedIndex].value;
    if (selectedMonth < 1 || selectedMonth > 12 || !selectedMonth)
      selectedMonth = "01";
    if (selectedMonth < 10) selectedMonth = "0" + selectedMonth;
    if (!selectedYear) selectedYear = 2021;

    let selectedMonthComplaintData = 0;
    let selectedMonthFeedbackData = 0;
    let selectedMonthAppealData = 0;

    let deptComplaintCount = 0;
    let deptFeedbackCount = 0;
    let deptAppealCount = 0;
    let deptFacilityCount = 0;
    let deptHRCount = 0;
    let deptAffairCount = 0;
    let deptAdminCount = 0;
    let deptUnassignedCount = 0;

    if (allData) {
      allData.map((ticket) => {
        let ticketDate = ticket.TicketDate.split("T")[0];
        if (
          ticketDate.split("-")[0] == selectedYear &&
          ticketDate.split("-")[1] == selectedMonth
        ) {
          if (ticket.TicketType === "Complaint") selectedMonthComplaintData++;
          else if (ticket.TicketType === "Feedback")
            selectedMonthFeedbackData++;
          else if (ticket.TicketType === "Appeal") selectedMonthAppealData++;

          if (ticket.TicketAssign === "Complaint Department") {
            deptComplaintCount++;
          } else if (ticket.TicketAssign === "Feedback Department") {
            deptFeedbackCount++;
          } else if (ticket.TicketAssign === "Appeal Department") {
            deptAppealCount++;
          } else if (ticket.TicketAssign === "Facility Management") {
            deptFacilityCount++;
          } else if (ticket.TicketAssign === "Administration") {
            deptAdminCount++;
          } else if (ticket.TicketAssign === "General Affairs") {
            deptAffairCount++;
          } else if (ticket.TicketAssign === "Human Resources") {
            deptHRCount++;
          } else {
            deptUnassignedCount++;
          }
        }
        return 0;
      });
    }

    setMonthComplaintData(selectedMonthComplaintData);
    setMonthFeedbackData(selectedMonthFeedbackData);
    setMonthAppealData(selectedMonthAppealData);

    setDeptComplaintCount(deptComplaintCount);
    setDeptFeedbackCount(deptFeedbackCount);
    setDeptAppealCount(deptAppealCount);
    setDeptFacilityCount(deptFacilityCount);
    setDeptAffairCount(deptAffairCount);
    setDeptAdminCount(deptAdminCount);
    setDeptHRCount(deptHRCount);
    setUnassignedCount(deptUnassignedCount);
  };

  const options = {
    scales: {
      y: {
        max: 18,
        min: 0,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  return (
    <React.Fragment>
      <TriageNav />
      <Card id="year-graph-container">
        <form className="form-select">
          <h2>Overview</h2>

          <label>Year: </label>
          <select id="select-chart-year" onChange={chartChangeHandler}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>

          <label>Month: </label>
          <select id="select-chart-month" onChange={chartChangeHandler}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </form>

        <div id="doughnut-chart" className="chart-container">
          <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
        </div>

        <div className="chart-container">
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>

        <form className="form-select">
          <h2>Yearly Graph</h2>
          <label>Year: </label>
          <select id="select-bar-year" onChange={yearChangeHandler}>
            <option value=" "></option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </form>

        <div className="bar-container">
          <Bar data={stackData} width={380} height={250} options={options} />
        </div>

        <div className="line-container">
          <Line data={stackData} width={380} height={250} options={options} />
        </div>
      </Card>
    </React.Fragment>
  );
};

export default DataDashboard;
