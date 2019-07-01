// will validate whether or not registration info is correct

const val = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

// Email checks
  if (val.isEmpty(data.email)) {
    errors.email = "Email required";
  } else if (!val.isEmail(data.email)) {
    errors.email = "Email invalid";
  }
// Password checks
  if (val.isEmpty(data.password)) {
    errors.password = "Password required";
  }
if (!val.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
}
return {
    errors,
    isValid: isEmpty(errors)
  };
};