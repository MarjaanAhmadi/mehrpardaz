const R = require("ramda");
let folders = [];

const me = ["saeed", "golabi", "reza", "hassan"];
const me2 = ["saeed", "dnewFolder"];

const re = R.join("/", R.slice(0, 2, me));

folders = [
  {
    title: me[0],
    path: R.join("/", R.slice(0, 1, me)),
    children: [
      {
        title: me[1],
        path: R.join("/", R.slice(0, 2, me)),
      },
    ],
  },
  {
    title: me[1],
    path: R.join("/", R.slice(0, 2, me)),
    children: {
      title: me[2],
      path: R.join("/", R.slice(0, 3, me)),
    },
  },
  {
    title: me[2],
    path: R.join("/", R.slice(0, 3, me)),
    children: [],
  },
];

const arr1 = [
  {
    title: "saeed",
    path: "saeed",
    children: [{ title: "golabi", path: "saeed/golabi" }],
  },
  {
    title: "golabi",
    path: "saeed/golabi",
    children: [{ title: "reza", path: "saeed/golabi/reza" }],
  },
  { title: "hassan", path: "saeed/golabi/reza/hassan", children: [] },
];

const arr2 = [
  {
    title: "saeed",
    path: "saeed",
    children: [
      { title: "dnewFolder", path: "saeed/dnewFolder" },
      { title: "golabi", path: "saeed/golabi" },
    ],
  },
  {
    title: "dnewFolder",
    path: "saeed/dnewFolder",
    children: [],
  },
];
const me22 = R.find(R.propEq("path", "saeed"))(arr2);
const me33 = R.find(R.propEq("path", "saeed"))(arr1);

const arr = [arr1, arr2];
// console.log("arr", arr);

// const concatChildren = (k, l, r) =>
//   k == "children" ? R.uniq(R.concat(l, r)) : r;

const mapInnerPaths = (arr) => {
  const objFolderReducer = (acc, nxt, idx) => {
    return [
      ...acc,
      {
        title: nxt,
        path: "/" + R.join("/", R.slice(0, idx + 1, arr)) + "/",
        children:
          idx + 1 === arr.length
            ? []
            : [
                {
                  title: arr[idx + 1],
                  path: "/" + R.join("/", R.slice(0, idx + 2, arr)) + "/",
                },
              ],
      },
    ];
  };
  return R.addIndex(R.reduce)(objFolderReducer, [], arr);
};
const mergeObjInArrayByKey = (obj, key, arr, concatFunc = R.mergeLeft) => {
  const curObj = R.find(R.propEq("path", obj[key]))(arr) || {};
  const remAcc = R.reject((el) => el[key] === obj[key])(arr);

  const finalPathObj = concatFunc(obj, curObj);
  return [...remAcc, finalPathObj];
};
const folderCreateReducer = (acc, arr) => {
  let folders = acc;
  const pathsArr = mapInnerPaths(arr);
  R.forEach((obj) => {
    folders = mergeObjInArrayByKey(obj, "path", folders, mergeObjByChildrens);
  })(pathsArr);
  return folders;
};

const allRoutes = [
  ["saeed", "golabi", "reza", "hassan"],
  ["saeed", "dnewFolder"],
  ["saeed", "dnewFolder", "dnewFolder4"],
];

const meeee = R.reduce(folderCreateReducer, [], allRoutes);

// console.log("arrSaeed", arrSaeed);
