// checks login info valid?

const val = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (val.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!val.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (val.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};