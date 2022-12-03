import React from "react";
import { List } from "../../../types";
import styles from "./ListComponent.module.css";

type Props = {
  list: List;
  title: string;
}

export const ListComponent = ({ title, list }: Props) => {
  if (list.items.length === 0) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {title}
      </div>
      <div>
        {list.items.map((item, index) => (
          <div key={index} className={styles.item}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
