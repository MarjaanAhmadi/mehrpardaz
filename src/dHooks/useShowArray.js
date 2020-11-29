import { useState } from "react";

export default (size) => {
  let initShow = new Array(size).fill(undefined).map((a) => false);

  const [show, setShow] = useState(initShow);

  const set = (index) => {
    let newShow = [...show].map((e, i) => (i === index ? !show[index] : false));

    setShow(newShow);
  };
  return [show, set];
};
