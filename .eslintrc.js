module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/label-has-for": 0,
    "no-param-reassign": 0,
    "no-restricted-globals": 0,
    "react/no-array-index-key": 0,
    "react/sort-comp": 0,
    "no-unneeded-ternary": 0,
    "no-underscore-dangle": 0,
    "array-callback-return": 0,
    "consistent-return": 0,
    "no-return-assign": 0,
    "no-inner-declarations": 0,
    "jsx-a11y/media-has-caption": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-debugger": 0
  },
  globals: {
    describe: true,
    document: true,
    expect: true,
    fetch: true,
    FileReader: true,
    FormData: true,
    jsPDF: true,
    it: true,
    localStorage: true,
    test: true,
    window: true,
    XMLHttpRequest: true
  }
};
