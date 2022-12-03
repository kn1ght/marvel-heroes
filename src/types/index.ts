export type CharacterDataWrapper = {
  data: CharacterDataContainer;
}

export type CharacterDataContainer = {
  results: Character[];
} & ServerPaging;

export type ServerPaging = {
  offset: number;
  limit: number;
  total: number;
  count: number;
}

export type ClientPaging = {
  page: number;
  total: number;
}

export type Character = {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Image;
  comics: List;
  stories: List;
  events: List;
  series: List;
}

export type List = {
  available: number;
  returned: number;
  collectionURI: string;
  items: SummaryItem[];
}

export type Image = {
  path: string;
  extension: string;
}

export type SummaryItem = {
  resourceURI: string;
  name: string;
}
