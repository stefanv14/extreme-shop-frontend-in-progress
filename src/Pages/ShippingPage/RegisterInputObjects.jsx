export const firstName = {
  regex: "[A-Z][a-z]{2,13}",
  errorMsg: "You have to enter first name in regular format",
  okMsg: "First name accepted",
  emptyValue: "first name",
};
export const lastName = {
  regex: "^[A-Z][a-z]{2,13}",
  errorMsg: "You have to enter last name in regular format",
  okMsg: "Last name accepted",
  emptyValue: "last name",
};
export const email = {
  regex: "\\w+([.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+",
  errorMsg: "You have to enter email in regular format",
  okMsg: "Email accepted",
  emptyValue: "email",
};
export const pass = {
  regex: "[A-Z][a-z]{2,13}",
  errorMsg: "You have to enter password in regular format",
  okMsg: "Password accepted",
  emptyValue: "password",
};
export const pid = {
  regex: "(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])[0-9]{9}",
  errorMsg: "You have to enter password in regular format",
  okMsg: "Password accepted",
  emptyValue: "password",
};
export const postal = {
  regex: "^[0-9]*$",
  errorMsg: "You have to enter postal in regular format",
  okMsg: "Postal accepted",
  emptyValue: "postal",
};
