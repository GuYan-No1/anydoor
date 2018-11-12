module.exports = {
    "env": {
      "es6": true,
      "commonjs":true,
        "node": true
    },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 2016,
      "sourceType": "script"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
      ],
      "no-console": [
        "error",
        { allow: ["warn", "error","info"] }]
    }
};
