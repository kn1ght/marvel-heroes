import { ClientPaging, ServerPaging } from "../types";

export const getClientPaging = (serverPaging: ServerPaging): ClientPaging => {
  const totalPages = Math.ceil(serverPaging.total / serverPaging.limit);
  const currentPage = Math.floor(serverPaging.offset / serverPaging.limit) + 1;

  return {
    total: totalPages,
    page: currentPage
  };
};

export const ITEMS_PER_PAGE = 10;

export const getOffsetAndLimit = (page: number) => {
  return {
    offset: (page - 1) * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE,
  };
};
