import { FlexBox } from '@romger/react-flex-layout';
import classnames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
import ReactSVG from 'react-svg';
import { DateService } from '../../services/dateService';
import { IMonthView } from './monthViewComponent';

const monthViewTemplate = (context: IMonthView) => {
    return (
        <FlexBox
            column="start stretch"
            className={classnames(
                'month-view',
            )}
        >
            <FlexBox
                row="space-between center"
                className={classnames(
                    'month-view__header',
                )}
            >
                <div
                    className={classnames(
                        'label-primary',
                        'month-view__header-title',
                    )}
                >
                    {
                        `${context.moment(`${context.props.month + 1}.1.${context.props.year}`)
                        .format(context.props.withoutYearTitle ? 'MMMM' : 'MMMM YYYY')}`
                    }
                </div>
                {
                    (!!context.props.stepByMonthCallback || !!context.props.defaultStepByMonthCallback) &&
                    <FlexBox
                        row="start center"
                    >
                        <ReactSVG
                            svgClassName={classnames('month-view__month-arrow-icon')}
                            src="assets/images/svg/ic_keyboard_arrow_left_24px.svg"
                            onClick={() => context.stepByMonthCallback(true)}
                        />
                        <ReactSVG
                            svgClassName={classnames('month-view__month-arrow-icon')}
                            src="assets/images/svg/ic_keyboard_arrow_right_24px.svg"
                            onClick={() => context.stepByMonthCallback()}
                        />
                    </FlexBox>
                }
            </FlexBox>
            <FlexBox
                row="space-around center"
                className={classnames(
                    'month-view__header-days',
                )}
            >
                {
                    moment
                        .weekdaysShort(true)
                        .map((day: string) => (
                            <FlexBox
                                key={day}
                                row="ctr"
                                className={classnames(
                                    'month-view__header-day',
                                    'caption-secondary',
                                )}
                            >
                                {day}
                            </FlexBox>
                        ))
                }
            </FlexBox>
            <div
                className={classnames('month-view__calendar-block')}
            >
                {
                    context.state.gridDaysByWeek.map((week: moment.Moment[], index: number) => (
                        <FlexBox
                            key={index}
                            row="space-around center"
                            className={classnames('month-view__calendar-week')}
                        >
                            {
                                week.map((day: moment.Moment) => (
                                    <FlexBox
                                        key={day.format('D')}
                                        row="ctr"
                                        className={classnames(
                                            'month-view__calendar-day-wrapper',
                                            {
                                                click: !!context.props.onClickDayCallback,
                                            },
                                        )}
                                        onClick={() => context.props.onClickDayCallback ? context.props.onClickDayCallback(day) : null}
                                    >
                                        <FlexBox
                                            row="ctr"
                                            className={classnames(
                                                'month-view__calendar-day',
                                                'caption-primary',
                                                {
                                                    'caption-secondary': !DateService.isDayInMonth(day, context.state.monthDaysRange),
                                                    'month-view__calendar-day--is-now': !!context.isNowDay(day),
                                                    'month-view__calendar-day--selected': !!context.isSelectedDay(day),
                                                },
                                            )}
                                        >
                                            {day.format('D')}
                                        </FlexBox>
                                    </FlexBox>
                                ))
                            }
                        </FlexBox>
                    ))
                }
            </div>
        </FlexBox>
    );
};

export default monthViewTemplate;
