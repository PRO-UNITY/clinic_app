import { BusyDay } from '../types/date/Date';
import { greenColor } from './colors';

// utils.js

export const formatBusyDaysToMarkedDates = (busyDays: BusyDay[]) => {
  return busyDays.reduce((acc, busyDay) => {
    const dateString = new Date(busyDay.timestamp).toISOString().split('T')[0];
    acc[dateString] = {
      selected: true,
      selectedColor: greenColor,
      selectedTextColor: 'white',
    };
    return acc;
  }, {} as Record<string, { selected: boolean; selectedColor: string; selectedTextColor: string }>);
};
