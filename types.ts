export type Tag = {
  id: number;
  name: string;
  count?: number;
};

export type Creator = {
  id: number;
  name: string;
  image: string;
};

export type Question = {
  id: number;
  title: string;
  tags: Tag[];
  creator: Creator;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
};
