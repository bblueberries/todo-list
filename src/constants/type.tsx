export type List = {
  id: string;
} & ListData;

export type RawList = {
  id: string;
} & RawListData;

export type RawListData = {
  title: string;
  body: string;
  tagIds: string[];
};
export type ListData = {
  title: string;
  body: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};
