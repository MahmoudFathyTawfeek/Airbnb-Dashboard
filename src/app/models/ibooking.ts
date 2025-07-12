export interface Ibooking {
  id: number;
  userId: string;
  unitId: string
  date: string; // or Date if parsing
  status?: 'confirmed' | 'pending' | 'cancelled';
}


