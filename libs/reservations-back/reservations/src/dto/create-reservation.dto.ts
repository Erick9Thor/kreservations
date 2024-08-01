export class CreateReservationDto {
  name: string;
  email: string;
  phone: string;

  partySize: number;
  sector: string;
  childrens: number;

  smokers: boolean;
  birthdays: boolean;
  birthDayName?: string;

  date: number;
  hour: string;
}

export class AvailableHourDTO {
  id: number;
  sector: string;
  seatingCapacity: number;
  available: boolean;
  title: string;
}
