import React from "react";
import { Spinner } from "@skbkontur/react-ui";
import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.root}>
      <Spinner />
    </div>
  );
};
