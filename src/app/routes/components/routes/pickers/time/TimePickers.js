import React, {useState} from 'react';
import moment from 'moment';
import {TimePicker} from 'material-ui-pickers';

const TimePickers = (props) => {
  const [selectedDate, setSelectedDate] = useState(moment);
 

  const handleDateChange = (date) => {
      setSelectedDate(date);
      props.setPublishedTime(date);
  };

    return (<div key="basic_time" className="picker">

      <TimePicker
        fullWidth
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>)
  
}
export default TimePickers;