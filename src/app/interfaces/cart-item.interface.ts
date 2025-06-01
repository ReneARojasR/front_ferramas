export interface CartItem {
  product: {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
  };
  quantity: number;
}
