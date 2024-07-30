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

  date: string;
  hour: string;
}
