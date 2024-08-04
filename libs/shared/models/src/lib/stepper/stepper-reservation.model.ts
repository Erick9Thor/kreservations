export interface UserReservation {
  name: string;
  email: string;
  phone: string;

  partySize: number;
  sector: string;
  childrens: number;

  smokers: boolean;
  birthdays: boolean;
  birthDayName?: string;

  date: string;
  hour: string;
}

export class AvailableHour {
  id: number;
  sector: string;
  seatingCapacity: number;
  available: boolean;
  title: string;
}
