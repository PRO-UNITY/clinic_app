export interface Doctor {
  id?: number;
  email?: string;
  first_name?: string;
  phone?: string;
  review?: number;
  specialty?: string;
  avatar?: string;
  about?: string;
  doctorId?: any;
  isFavorite?: boolean;
  onBookmarkPress?: any;
}
