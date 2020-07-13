import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { inputsValidation } from "../../Utilities/inputValidation";
import "./RegisterPage.css";

const ReusableInput = (props) => {
    const [userInfo, setUserInfo] = useState("");
    const [errors, setErrors] = useState({});
    const inputHandle =  (
      e,
      regex,
      okMsg,
      errMsg
    ) => {
      const resp = inputsValidation(
        e.target.name,
        e.target.value,
        regex,
        okMsg,
        errMsg
      );
      console.log(resp);
      setUserInfo(resp.elValue);
      
      setErrors({ error: resp.error, errorMessage: resp.errorMessage });
      console.log({ userInfo, errors });
      const name = e.target.name;
      console.log(userInfo);
      props.handler(name, userInfo, errors.error);
    };
    const style = {
      border: "1px solid red",
      ":focus": {
        border: "1px solid red",
      },
    };
    return (
      <>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          style={errors.error === true ? style : {}}
          onChange={(e) =>
            inputHandle(
              e,
              props.elName.regex,
              props.elName.okMsg,
              props.elName.errorMsg
            )
          }
        />
        {errors.error && <div className="text-danger">{errors.errorMessage}</div>}
      </>
  )
}

export default ReusableInput
