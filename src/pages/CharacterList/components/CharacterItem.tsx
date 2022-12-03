import React from "react";
import { Link } from "react-router-dom";
import { Character } from "../../../types";
import styles from "./CharacterItem.module.css";

type Props = {
  character: Character;
};

export const CharacterItem = ({ character }: Props) => {
  return (
    <div className={styles.root}>
      <Link
        to={`characters/${character.id}`}
        style={{backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})`}} 
        className={styles.imgContainer}
      />
      <div className={styles.content}>
        <Link to={`characters/${character.id}`} className={styles.name}>
          {character.name}
        </Link>
        <div className={styles.description}>
          {getDescription(character.description)}
        </div>
      </div>
    </div>
  );
};

const MAX_DESC_LEN = 80;

const getDescription = (description: string) => {
  if (!description) {
    return "—";
  }

  if (description.length > MAX_DESC_LEN) {
    return description.slice(0, MAX_DESC_LEN) + "...";
  }

  return description;
};
