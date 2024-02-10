export type PocketCard = {
  code: string;
  image: {
    landscape: boolean;
    url: string;
  };
  name: string;
  xp: number;
};

export type Pocket = {
  cards: PocketCard[];
};

export type Binder = {
  pockets: Pocket[];
};

export interface IBinderOutput {
  binderUpdated(binder: Binder): void;
}
