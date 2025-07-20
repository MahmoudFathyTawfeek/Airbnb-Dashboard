export interface Ilisting {
  id: number | string;
  title: string;
  unitId: number;
  pricePerNight: number;
  status: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}
