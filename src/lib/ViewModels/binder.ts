import type { Readable } from 'svelte/store';

export type Pocket = {
  title: string;
  coverImage: {
    landscape: boolean;
    url: string;
  };
};

export type BinderPage = {
  pockets: Pocket[];
};

export type Binder = {
  currentPage: Readable<number>;
  howManyPages: Readable<number>;

  leftPage: Readable<BinderPage>;
  rightPage: Readable<BinderPage>;

  handleLeftPageClick: () => void;
  handleRightPageClick: () => void;
};
