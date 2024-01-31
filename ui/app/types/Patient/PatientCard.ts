import { Patient } from './Patient';

export interface PatientsCardProps extends Patient {
  icon?: string;
  iconColor: string;
  navigation?: any;
  screen?: string;
  patientId?: number;
  buttons?: Button[];
  date?: string;
  time?: string;
}
