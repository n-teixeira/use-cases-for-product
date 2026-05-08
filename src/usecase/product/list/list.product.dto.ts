export interface InputListProductDto {}

type ProductListItem = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListProductDto {
  products: ProductListItem[];
}
