import axios from 'axios';
import { isLeapYear, parseDateToNumbers } from '../../helpers';
import { Holidays, ICalendar } from '../interface/calendar';

interface ICalendarClass {
  calendar: ICalendar;
  build: (year: number) => ICalendar;
  getCountryCode: () => Promise<void>;
  getData: () => Promise<void>;
}

export class Calendar implements ICalendarClass {
  private static instance: Calendar;
  private countryCode: string = 'UA';
  public calendar: ICalendar = [];
  holidays: Holidays[] = [];

  constructor() {
    if (typeof Calendar.instance === 'object') {
      return Calendar.instance;
    } else {
      Calendar.instance = this;
      return this;
    }
  }

  async getCountryCode() {
    try {
      const { data } = await axios.get('https://ipapi.co/json/');
      this.countryCode = data.country;
    } catch (e) {
      console.error(e);
      this.countryCode = 'UA';
    }
  }

  async getData() {
    await this.getCountryCode();
    const year = new Date().getFullYear();
    const { data: holidays } = await axios.get<Holidays[]>(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${this.countryCode}`,
    );
    this.holidays = holidays;
  }

  build(year: number) {
    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const months = Array(12).fill(null);

    const calendar: ICalendar = months.map((_, monthIndex) => {
      return Array(daysInMonth[monthIndex])
        .fill(null)
        .map((_, dayIndex) => {
          const date = new Date(Date.UTC(year, monthIndex, dayIndex + 1)).toISOString().split('T')[0];
          const holiday = this.holidays.find((item) => item.date.slice(5) === date.slice(5))?.localName ?? null;
          return { date, holiday };
        });
    });
    calendar.forEach((el, index, array) => {
      let range = 35 - el.length;
      for (let i = 0; range > 0; i++) {
        if (index !== 11) {
          el.push(array[index + 1][i]);
          range--;
        } else {
          const [year] = parseDateToNumbers(array[0][i].date);
          el.push({ date: `${+year + 1}-01-0${i + 1}`, holiday: array[0][i].holiday });
          range--;
        }
      }
    });

    this.calendar = calendar;
    return calendar;
  }
}
