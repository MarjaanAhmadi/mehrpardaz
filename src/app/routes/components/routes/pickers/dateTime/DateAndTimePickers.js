import React, { useState } from "react";
import { DateTimePicker } from "material-ui-pickers";
const DateAndTimePickers = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleDateChange(date) {
    setSelectedDate(date);
    props.setPublishedTime(date);
  }

  return (
    <div key="datetime_default" className="picker">
      <DateTimePicker
        fullWidth
        value={selectedDate}
        showTabs={false}
        onChange={handleDateChange}
        leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
        rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
      />
    </div>
  );
};
export default DateAndTimePickers;
