export interface ItemProps {
  name: string;
  content: string;
  category: string;
}

export interface ContentsProps {
  itemId: number;
  // itemInfo: ItemProps;
  // itemImage: File | string | undefined;
  
  recommendImageName: string | File;
  recommendImageUrl: string | undefined;
}

export interface StyleContentsProps {
  itemId: number;
  itemInfo: ItemProps;
  itemImage: File | string | undefined;

}

export interface MakeupCustomizeResponse {
  status?: string;
  imageName?: string;
  imageUrl?: string;
  message?: string;
  /** ✅ 서버가 base64를 내려줄 때 사용되는 필드 */
  result_image_base64?: string;
}