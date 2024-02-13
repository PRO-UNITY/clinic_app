interface DoctorType {
  results: [];
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  gender: string;
  phone: string;
  role: string;
  avatar: string | null;
  address: string | null;
  information: string;
  reviews: number;
  is_saved: boolean;
  hospital: {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
    logo: string | null;
  };
  categories: string;
  content: any[];
  date: string;
}

export default DoctorType;

export interface DoctorApiResponseType {
  count: number;
  next: string | null;
  previous: string | null;
  results: DoctorType[];
}
