import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.root}>
      <h3>
        <Link to="/characters" className={styles.title}>
          Marvel Heroes
        </Link>
      </h3>
    </div>
  );
};
