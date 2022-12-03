import React from "react";
import { Button } from "@skbkontur/react-ui";
import { useParams, useHistory } from "react-router-dom";
import { ErrorComponent, Loader } from "../../components";
import { useCharacterStore } from "../../store";
import { ListComponent } from "./components";
import styles from "./index.module.css";

type Params = {
  id: string;
};

export const Character = () => {
  const params = useParams<Params>();
  const history = useHistory();
  const { character, getCharacter, loading, error } = useCharacterStore();

  React.useEffect(() => {
    const ac = new AbortController();
    getCharacter({ id: params.id, ac });

    return () => {
      ac.abort();
    };
  }, [params.id]);

  const handleGoBack = () => {
    history.goBack();
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error || !character) {
    return (
      <ErrorComponent />
    );
  }

  return (
    <div>
      <h1 className={styles.name}>
        {character.name}
      </h1>
      <div>
        <div className={styles.imgContainer}>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
        </div>
      </div>
      {character.description && (
        <div className={styles.description}>
          {character.description}
        </div>)}
      <ListComponent
        title="Stories:"
        list={character.stories}
      />
      <ListComponent
        title="Events:"
        list={character.events}
      />
      <ListComponent
        title="Series:"
        list={character.series}
      />
      <Button onClick={handleGoBack} className={styles.button}>
        Go Back
      </Button>
    </div>
  );
};
