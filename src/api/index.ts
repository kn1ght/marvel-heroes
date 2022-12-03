import { getOffsetAndLimit } from "../helpers";
import { CharacterDataWrapper } from "../types";

const HOST = "gateway.marvel.com";
const PORT = 443;
const API_KEY = "6dcc49b079349c10d4103f3433337c3d";
const PREFIX = "v1/public";

const buildSearchParms = (params?: Record<string, unknown>) => {
  const filteredParams = params
    ? Object.entries(params).reduce((res, item) => {
      const [key, value] = item;
      if (value === undefined || value === null || value === "") {
        return res;
      }

      res[key] = value;
      return res;
    }, {} as Record<string, unknown>)
    : {};

  return new URLSearchParams({
    apikey: API_KEY,
    ...filteredParams
  });
};

const buildUrl = (route: string, params?: Record<string, unknown>) => {
  const searchParams = buildSearchParms(params);
  return `https://${HOST}:${PORT}/${PREFIX}/${route}?${searchParams}`;
};

type TResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  reason: "aborted" | "error";
}

const fetchWrap = async <T>(url: string, init?: RequestInit): Promise<TResponse<T>> => {
  try {
    const response = await fetch(url, init);
    if (response.ok) {
      const data = await response.json() as T;
      return {
        success: true,
        data
      };
    }

    if (init?.signal?.aborted) {
      return {
        success: false,
        reason: "aborted"
      };
    }

    return {
      success: false,
      reason: "error"
    };
  } catch (e) {
    return {
      success: false,
      reason: "error"
    };
  }
};

type GetHeroesParams = {
  page: number;
  nameStartsWith: string;
  orderBy: OrderBy;
  ac: AbortController;
}

export type OrderBy = "name" | "-name" | "modified" | "-modified";

export const getHeroes = async ({ page, nameStartsWith, orderBy, ac }: GetHeroesParams) => {
  const offsetAndLimit = getOffsetAndLimit(page);
  const url = buildUrl("characters", { ...offsetAndLimit, nameStartsWith, orderBy });

  return fetchWrap<CharacterDataWrapper>(url, {signal: ac.signal});
};

type GetHeroParams = {
  id: string;
  ac: AbortController;
}

export const getHero = async ({ id, ac }: GetHeroParams) => {
  const url = buildUrl(`characters/${id}`);

  return fetchWrap<CharacterDataWrapper>(url, {signal: ac.signal});
};
