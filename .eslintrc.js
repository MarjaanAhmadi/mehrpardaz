module.exports = {
  root: true,
  extends: "react-app",
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-no-bind": [
      1,
      {
        ignoreRefs: false,
        allowFunctions: true,
      },
    ],
  },
};
