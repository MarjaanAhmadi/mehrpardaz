import * as R from "ramda";

const normalizer = (road) => (acc, item) => {
  const maker = {
    road: road(item),
  };
  return R.mergeDeepWith(R.concat, acc, maker);
};

const dNormalizer = (road, items) => {
  return R.reduce(normalizer(road), {}, items);
};

export default dNormalizer;
// const values = R.reduce(normalizer, {}, trades)
