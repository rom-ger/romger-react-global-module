import { DateRange, extendMoment } from 'moment-range';
import 'moment/locale/ru';
import { IGridCalendar } from '../../interfaces';
import { moment } from './momentService';
import { UtilService } from './utilService';

export class DateService {

    /**
     * Получить локал дэйт из даты
     * @param day
     */
    public static getLocalDate(date: Date | null, withTime?: boolean): string | null {
        if (!date) {
            return null;
        }
        let momentDate: moment.Moment = moment(date);
        if (!momentDate.isValid()) {
            return null;
        }
        return momentDate.format(withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD');
    }

    /**
     * Получить формат даты для отображения
     * @param day
     */
    public static getVisibleFormatByDate(date: Date | null, withTime?: boolean): string | null {
        if (!date) {
            return null;
        }
        let momentDate: moment.Moment = moment(date);
        if (!momentDate.isValid()) {
            return null;
        }
        return momentDate.format(withTime ? 'DD.MM.YYYY HH:mm' : 'DD.MM.YYYY');
    }

    /**
     * Получить нормальную дату через момент
     * @param day
     */
    public static getValidDate(date: string | number | Date | null): Date | null {
        if (!date) {
            return null;
        }
        let momentDate: moment.Moment = moment(date);
        if (!momentDate.isValid()) {
            return null;
        }
        return momentDate.toDate();
    }

    /**
     * Это день является сегодняшним
     * @param day
     */
    public static isNow(day: moment.Moment): boolean {
        return !!moment(day)
            .startOf('day')
            .isSame(moment()
                .startOf('day'));
    }

    /**
     * Это день в выбранном месяце
     * @param day
     * @param monthDaysRange
     */
    public static isDayInMonth(day: moment.Moment, monthDaysRange: DateRange | null): boolean {
        return !!monthDaysRange
            && monthDaysRange.contains(day);
    }

    /**
     * Обновить сетку календаря
     */
    public static getGridCalendarByDate(date: moment.Moment | Date = new Date()): IGridCalendar {
        let daysInWeek: number = 7;

        let selectedYear: number = moment(date)
            .year();

        let selectedMonth: number = moment(date)
            .month();

        let monthStartDate: moment.Moment = moment(date)
            .startOf('month');

        let monthEndDate: moment.Moment = moment(date)
            .endOf('month');

        let daysGridStartDay: moment.Moment = moment(monthStartDate)
            .startOf('week');

        let daysGridEndDay: moment.Moment = moment(monthEndDate)
            .endOf('week');

        let monthDaysRange: DateRange = extendMoment(moment)
            .range(monthStartDate, monthEndDate);

        let gridDaysRange: DateRange = extendMoment(moment)
            .range(daysGridStartDay, daysGridEndDay);

        let gridDays: moment.Moment[] = Array.from(gridDaysRange.by('days'));

        let gridDaysByWeek: moment.Moment[][] = UtilService.chunkArray<moment.Moment>(gridDays, daysInWeek);

        return { selectedYear, selectedMonth, gridDaysByWeek, monthDaysRange };
    }
}
