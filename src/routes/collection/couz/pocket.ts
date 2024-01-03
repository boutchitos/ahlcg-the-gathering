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
  currentPage: number;
  howManyPages: number;
  leftPage: BinderPage;
  rightPage: BinderPage;

  handleLeftPageClick: () => void;
  handleRightPageClick: () => void;
}
