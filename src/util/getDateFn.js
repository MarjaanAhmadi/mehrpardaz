import moment from "moment";

const getDateFns = (type) => (date1, date2) => {
  const today = moment(new Date());

  switch (type) {
    case "diffFromToday":
      const diff = today.diff(date1, "day");
      if (diff === 7) return "week ago";
      if (diff > 7) return moment(date1).format("YYYY/MM/DD");
      if (diff === 0) {
        const hours = today.diff(date1, "hour");
        if (hours === 0) return `less than an hour`;
        return `${hours} hours ago`;
      }
      return `${diff} days ago`;
    default:
      break;
  }
};

export default getDateFns;
