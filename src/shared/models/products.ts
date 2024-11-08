export interface ImageType {
  imageId: string;
  imageUrl: string;
}

export interface SellerType {
  commertialOffer: {
    Price: number;
    ListPrice: number;
    IsAvailable: boolean;
  };
}

export interface ItemType {
  itemId: string;
  name: string;
  images: ImageType[];
  sellers: SellerType[];
}

export interface ProductType {
  productId: string;
  brand: string;
  productTitle: string;
  items: ItemType[];
}
