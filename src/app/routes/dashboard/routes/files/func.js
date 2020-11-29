import * as R from "ramda";

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

const mergeObjByChildrens = R.mergeWithKey(
  (k, l, r) => (k == "children" ? R.uniq(R.concat(l, r)) : r),
  R.__,
  R.__
);

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

const folderCreator = R.reduce(folderCreateReducer, [], R.__);

const uniqPathsByKey = (files, key) => {
  const uniqByKey = (key) =>
    R.compose(
      R.uniq,
      R.map((f) => R.compose(R.init, R.tail, R.split("/"))(f[key]))
    );

  return uniqByKey(key)(files);
};

const setObjToKey = (files, key) => {
  return R.reduce(
    (acc, file) => {
      const curPathFiles = acc[file[key]] || [];
      return { ...acc, [file[key]]: [...curPathFiles, file] };
    },
    {},
    files
  );
};

export { folderCreator, uniqPathsByKey, setObjToKey };
