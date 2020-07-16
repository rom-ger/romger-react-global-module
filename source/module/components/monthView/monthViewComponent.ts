import { RgReactBaseComponent, RgReactBaseComponentInterface } from '@romger/react-base-components';
import * as moment from 'moment';
import { DateRange } from 'moment-range';
import 'moment/locale/ru';
import { IGridCalendar } from '../../../interfaces';
import { DateService } from '../../services/dateService';
import { GlobalStore } from '../../store/globalStore';
import monthViewTemplate from './monthViewTemplate';

export interface MonthViewProps {
    globalStore?: GlobalStore;
    year: number;
    month: number;
    withoutYearTitle?: boolean;
    stepByMonthCallback?: (back?: boolean) => any;
    selectedDays?: moment.Moment[];
    nowDay?: moment.Moment;
    defaultStepByMonthCallback?: (year: number, month: number) => any;
    onClickDayCallback?: (day: moment.Moment) => any;
}

export interface MonthViewState {
    monthDaysRange: DateRange | null;
    gridDaysByWeek: moment.Moment[][];
}

export interface IMonthView extends RgReactBaseComponentInterface {
    props: MonthViewProps;
    state: MonthViewState;

    isSelectedDay(day: moment.Moment): boolean;
    isNowDay(day: moment.Moment): boolean;
    stepByMonthCallback(back?: boolean): void;
}

export default class MonthView extends RgReactBaseComponent<MonthViewProps, MonthViewState> implements IMonthView {
    state: MonthViewState = {
        monthDaysRange: null,
        gridDaysByWeek: [],
    };

    componentDidMount() {
        this.initComponent();
    }

    componentWillReceiveProps(newProps: MonthViewProps) {
        this.initComponent(newProps);
    }

    /**
     * Инициализация
     */
    initComponent = (props: MonthViewProps = this.props) => {
        this.updateGrid(this.moment(`${props.month + 1}.1.${props.year}`));
    }

    /**
     * Обновить сетку календаря
     */
    updateGrid(date: moment.Moment | Date = new Date()): void {
        let gridCalendarByDate: IGridCalendar = DateService.getGridCalendarByDate(date);
        this.setState(
            {
                gridDaysByWeek: gridCalendarByDate.gridDaysByWeek,
                monthDaysRange: gridCalendarByDate.monthDaysRange,
            },
        );
    }

    /**
     * Переключаем месяц
     */
    stepByMonthCallback = (back?: boolean) => {
        if (!!this.props.stepByMonthCallback) {
            this.props.stepByMonthCallback(back);
            return;
        }
        if (!this.props.defaultStepByMonthCallback) {
            return;
        }
        let date = this.moment()
                       .year(this.props.year)
                       .month(this.props.month);
        if (back) {
            date.subtract(1, 'month');
        } else {
            date.add(1, 'month');
        }
        this.props.defaultStepByMonthCallback(date.year(), date.month());
    }

    /**
     * Это день выделен
     * @param day
     */
    isSelectedDay(day: moment.Moment): boolean {
        if (!this.props.selectedDays) {
            return false;
        }
        return this.props.selectedDays.findIndex((el: moment.Moment) => el.startOf('day')
                                                                          .isSame(day.startOf('day'))) !== -1;
    }

    /**
     * Это день считаем сегодняшним
     * @param day
     */
    isNowDay(day: moment.Moment): boolean {
        if (this.props.nowDay) {
            return this.props.nowDay.startOf('day')
                                    .isSame(day.startOf('day'));
        }
        return !!DateService.isNow(day);
    }

    render(): false | JSX.Element {
        return (
            monthViewTemplate(this)
        );
    }
}
