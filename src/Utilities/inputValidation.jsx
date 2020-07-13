export const inputsValidation = (
  element,
  elementValue,
  regex,
  okMessage,
  errorMessage,
  emptyValue = "something"
) => {
  const reElement = new RegExp(regex);
  if (reElement.test(elementValue) && elementValue !== "") {
    console.log("Dobar format");

    return { error: false, elValue: elementValue };
  } else {
    if (elementValue === "") {
      return (errorMessage = "You have to type " + emptyValue + "!");
    }
    console.log("Pogresan format");

    return { error: true, errorMessage, elValue: elementValue };
  }
};
