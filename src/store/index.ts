import create from "zustand";
import { getHeroes, getHero } from "../api";
import { getClientPaging } from "../helpers";
import { Character, ClientPaging } from "../types";

type CharactersState = {
  characters: Character[];
  paging?: ClientPaging;
  loading: boolean;
  error: boolean;
  getCharacters: (...params: Parameters<typeof getHeroes>) => void;
};

export const useCharacterListStore = create<CharactersState>((set) => ({
  characters: [],
  paging: undefined,
  loading: false,
  error: false,
  getCharacters: async (...params) => {
    set({ loading: true });

    const response = await getHeroes(...params);

    if (response.success) {
      const { results, ...paging } = response.data.data;
      set({
        paging: getClientPaging(paging),
        characters: results,
        loading: false,
        error: false
      });
      return;
    }

    if (response.reason === "aborted") {
      return;
    }

    set({
      loading: false,
      error: true
    });
  }
}));

type CharacterState = {
  character?: Character;
  loading: boolean;
  error: boolean;
  getCharacter: (...params: Parameters<typeof getHero>) => void;
};

export const useCharacterStore = create<CharacterState>((set) => ({
  character: undefined,
  loading: false,
  error: false,
  getCharacter: async (...params) => {
    set({ loading: true });

    const response = await getHero(...params);

    if (response.success) {
      const { results } = response.data.data;
      set({
        character: results[0],
        loading: false,
        error: false
      });
      return;
    }

    if (response.reason === "aborted") {
      return;
    }

    set({
      loading: false,
      error: true,
    });
  }
}));
