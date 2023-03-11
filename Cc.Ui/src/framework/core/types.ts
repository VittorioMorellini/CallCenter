import { Entity, YupValidator } from '../entity';

export class ServiceError extends Error {

    status: number;
    statusText: string;
    errorText: string;

    constructor(message: string, status: number, statusText: string) {
      super(message);
      this.status = status;
      this.statusText = statusText;
      this.errorText = message;
    }
}

export type Action = { 
  type: string;
  entity?: string;
}

export type EntityActionsType<T, M> = {
  find: (id: string | number) => Promise<T>,
  search: (model: M) => Promise<T[]>
  searchNextPage: (model: M, skip: number) => Promise<T[]>
  searchAll: (model: M) => Promise<T[]>,
  save: (item: T, validator?: YupValidator) => Promise<T>
  delete: (id: string | number) => Promise<any>,
  itemSelected: (item: T, index: number) => Action,
  clearCurrentItem: () => Action,
  setModel: (model: M) => Action,
  setItems: (items: T[]) => Action
};

export type EntityLoaderState<T extends Entity, M> = {
  isBusy: boolean;
  items: Array<T>;
  currentItem?: T;
  currentItemIndex: number;
  searchModel: M;

  pageLoader: InnerPageLoader;
}

type InnerPageLoader = {
  isLoading: boolean;
  hasNext: boolean;
}

export type PageLoader = InnerPageLoader & {
  loadNext: (skip: number) => Promise<any>;
  take: number;
}

