import React from "react";

export default function DateInput() {
  return (
    <div className="airport-select-row">
      <label>Data:</label>
      <div className="select-airport-container">
        <i className="fas fa-calendar-alt"></i>
        <input type="date" className="date-input" />
      </div>
    </div>
  );
}
