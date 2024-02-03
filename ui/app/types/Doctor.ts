export interface Doctor {
  id?: number;
  email?: string;
  first_name?: string;
  phone?: string;
  review?: number;
  reviews?: number;
  specialty?: string;
  avatar?: string;
  about?: string;
  categories?: string;
  doctorId?: any;
  isFavorite?: boolean;
  onBookmarkPress?: any;
  content?: [];
}
