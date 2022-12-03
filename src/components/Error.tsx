import React from "react";
import { Link } from "@skbkontur/react-ui";
import styles from "./Error.module.css";

export const ErrorComponent = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={styles.root}>
      Something went wrong... Try to <Link onClick={handleRefresh}>refresh the page</Link>
    </div>
  );
};
