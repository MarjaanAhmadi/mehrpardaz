import * as yup from "yup";

export default function (schema, config) {
  const { name, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[name] = validator;
  return schema;
}
// using with reduce schema => acc , config => el

export function yupSchemaCreator(schema, config) {
  const { name, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    // if (type === "matches") {
    //   validator = validator.matches(params[0], params[1]);
    // }
    if (type === "required") {
      validator = validator["typeError"](...params);
    }
    if (type === "of") {
      validator = validator[type](yup.object().shape(params));
    } else {
      validator = validator[type](...params);
    }
  });
  schema[name] = validator;

  return schema;
}

const memoize = (fn) => {
  let cache = {};
  return (key, ...args) => {
    let result = (cache[key] = cache[key] || fn(...args));
    return result;
  };
};

const sechemaReducer = (data) => data.reduce(yupSchemaCreator, {});
const memoSchema = memoize(sechemaReducer);

export const yupFactory = (data, key) => {
  const schema = yup.object().shape(memoSchema(key, data));
  const checkFiled = async (name, value) => {
    try {
      await schema.validateAt(name, { [name]: value }, { abortEarly: false });
      return "";
    } catch (err) {
      const message =
        err &&
        err.errors &&
        err.errors.reduce(
          (acc, er, index) => `${acc}${index > 0 ? "/" : ""} ${er}`,
          ""
        );
      return message;
    }
  };

  const checkValidation = async (vals) => {
    try {
      await schema.validate(vals, { abortEarly: false });
      let messages = {};
      for (let key in vals) {
        messages[key] = "";
      }

      return ["", messages];
    } catch (err) {
      const output =
        err &&
        err.inner &&
        err.inner.reduce(
          (acc, error, index) => {
            const { path, message } = error;
            const mes = `${acc[0] || ""}${index > 0 ? "/" : ""} ${message}`;
            const allmes = {
              ...acc[1],
              [path]: `${acc[1][path] || ""}${
                acc[1][path] ? "/" : ""
              } ${message}`,
            };

            return [mes, allmes];
          },
          ["", {}]
        );

      return output;
    }
  };
  return [checkFiled, checkValidation];
};
