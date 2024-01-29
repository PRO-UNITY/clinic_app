export interface Patient {
  id: number;
  first_name: string;
  phone?: string;
  imageUrl: string;
  status: string;
  gender?: string | number;
  user?: any;
  content?: string;
}
