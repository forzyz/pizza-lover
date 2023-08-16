import React from "react";
import { useRouteError } from "react-router-dom";

import styles from "./ErrorBlock.module.scss";

interface ErrorResponse {
  statusText?: string;
  message?: string;
  // ... other properties ...
}

export const ErrorBlock: React.FC = () => {
  const rawError = useRouteError();

  // Type guard to narrow down the type of the error
  const error: ErrorResponse =
    typeof rawError === "object" && rawError !== null ? rawError : {};

  return (
    <div id={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error.statusText || error.message || "An unknown error occurred."}
        </i>
      </p>
    </div>
  );
};
