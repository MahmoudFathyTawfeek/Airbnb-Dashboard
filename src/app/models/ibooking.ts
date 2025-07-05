export interface Ibooking {
  id: number;
  userId: number;
  unitId: string
  date: string; // or Date if parsing
  status?: 'confirmed' | 'pending' | 'cancelled';
}


