import React, { useContext } from "react";
import { Alert } from "antd";
import { Errors } from "../Context";

const Alerts = () => {
  const { errors, removeError } = useContext(Errors);
  return (
    <div>
      {errors.map((err) => (
        <Alert
          message={err.message}
          key={err.id}
          type="error"
          afterClose={() => {
            removeError(err.id);
          }}
          closable
        />
      ))}
    </div>
  );
};

export default Alerts;
