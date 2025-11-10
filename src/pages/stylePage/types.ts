export interface ItemProps {
  name: string;
  content: string;
  category: string;
}

export interface ContentsProps {
  itemId: number;
  itemInfo: ItemProps;
  itemImage: File | string | undefined;
}