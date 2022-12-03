import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Input, Paging, Select } from "@skbkontur/react-ui";
import { useCharacterListStore } from "../../store";
import { OrderBy } from "../../api";
import { ErrorComponent, Loader } from "../../components";
import { CharacterItem } from "./components";
import styles from "./index.module.css";

const SEARCH_KEY = "nameStartsWith";
const PAGE_KEY = "page";
const ORDER_BY_KEY = "orderBy";

const ORDER_BY_ITEMS: [OrderBy, string][] = [
  ["name", "name (asc)"],
  ["-name", "name (desc)"],
  ["modified", "modified (asc)"],
  ["-modified", "modified (desc)"],
];

export const CharacterList = () => {
  const { characters, loading, error, getCharacters, paging } = useCharacterListStore();
  const { search } = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(search);
  const nameStartsWith = searchParams.get(SEARCH_KEY) ?? "";
  const page = Number(searchParams.get(PAGE_KEY) || (paging?.page ?? 1));
  const orderBy: OrderBy = searchParams.get(ORDER_BY_KEY) as OrderBy ?? "name";

  React.useEffect(() => {
    const ac = new AbortController();
    getCharacters({ page, nameStartsWith, orderBy, ac });

    return () => {
      ac.abort();
    };
  }, [getCharacters, page, nameStartsWith, orderBy]);

  const handlePageChange = (page: number) => {
    searchParams.set(PAGE_KEY, page.toString());
    history.push({ search: searchParams.toString() });
  };

  const handleSearchChange = (value: string) => {
    searchParams.set(SEARCH_KEY, value);
    searchParams.set(PAGE_KEY, "1");
    history.push({ search: searchParams.toString() });
  };

  const handleSortChange = (value: OrderBy) => {
    searchParams.set(ORDER_BY_KEY, value);
    searchParams.set(PAGE_KEY, "1");
    history.push({ search: searchParams.toString() });
  };

  if (error) {
    return (
      <ErrorComponent />
    );
  }

  return (
    <>
      <div className={styles.controls}>
        <div>
          <Input
            placeholder='Search...'
            value={nameStartsWith}
            onValueChange={handleSearchChange}
          />
        </div>
        <div>
          <Select
            items={ORDER_BY_ITEMS}
            value={orderBy}
            onValueChange={handleSortChange}
          />
        </div>
      </div>
      {loading
        ? (
          <Loader />
        ) : (
          <>
            <div>
              <div className={styles.list}>
                {characters.map(c => (
                  <React.Fragment key={c.id}>
                    <CharacterItem character={c} />
                  </React.Fragment>
                ))}
              </div>
              {characters.length === 0 && "No characters found"}
            </div>
          </>
        )}
      {Boolean(paging?.total) && (
        <div className={styles.paging}>
          <Paging
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            pagesCount={paging!.total}
            activePage={page}
            onPageChange={handlePageChange}
          />
        </div>)}
    </>
  );
};
