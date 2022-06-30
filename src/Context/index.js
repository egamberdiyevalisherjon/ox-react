import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const Errors = createContext([]);

const Provider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  function newError(message) {
    setErrors((p) => [
      ...p,
      {
        id: uuidv4(),
        message,
      },
    ]);
  }

  function removeError(id) {
    setErrors((p) => p.filter((e) => e.id !== id));
  }

  return (
    <Errors.Provider
      value={{
        errors,
        newError,
        removeError,
      }}
    >
      {children}
    </Errors.Provider>
  );
};

export default Provider;
