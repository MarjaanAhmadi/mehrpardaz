const R = require("ramda");

const data = [{ title: "saeed" }, { title: "reza" }];

const me = { title: "saeed" };

const check = (item) => {
  return R.compose(R.includes, R.prop);
};
const serachProp = (prop, val) => R.compose(R.includes(val), R.prop(prop));

const me2 = R.filter(serachProp("title", "sae"))(data);
console.log("me2", me2);

const moment = require("moment");

const date1 = new Date(2020, 10, 10, 17, 30);
// const date1 = new Date(2018, 11, 24);
const date2 = new Date(2018, 12, 25);

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

console.log(new Date());

console.log(getDateFns("diffFromToday")(date1));
