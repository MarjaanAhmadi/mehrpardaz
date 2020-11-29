import { useState } from "react";
// import { useAlert } from "react-alert";
import { yupFactory } from "./CreateYupJSon";

export default function useValidation(init) {
  // const alert = useAlert();
  const [errors, setErrors] = useState({});
  const { data, key } = init;
  const [checker, checkVal] = yupFactory(data, key);

  async function checkFiled(name, value) {
    const message = await checker(name, value);
    setErrors((prev) => ({ ...prev, [name]: message }));
  }

  async function checkValidation(values) {
    const [mess, allmess] = await checkVal(values);

    if (mess) {
      setErrors((prev) => ({ ...prev, ...allmess }));

      return false;
    }
    return true;
  }

  return { errors, checkFiled, checkValidation };
}
