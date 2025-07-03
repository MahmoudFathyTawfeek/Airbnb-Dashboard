export interface Ibooking {
  id: number;
  userId: number;
  unitId: number;
  date: string; // or Date if parsing
  status?: 'confirmed' | 'pending' | 'cancelled';
}


