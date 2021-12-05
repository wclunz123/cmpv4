import React from "react";

const TicketTableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Ticket ID</th>
        <th>Type</th>
        <th>Date</th>
        <th>Due Date</th>
        <th>Category</th>
        <th>Status</th>
        <th>Priority</th>
        <th>Requestor</th>
        <th>Department</th>
      </tr>
    </thead>
  );
};

export default TicketTableHeader;
