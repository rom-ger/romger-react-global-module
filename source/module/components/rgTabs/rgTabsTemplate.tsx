import { FlexBox } from '@romger/react-flex-layout';
import classnames from 'classnames';
import * as React from 'react';
// @ts-ignore
import DRAG_HANDLE from '../../../assets/images/svg/ic_drag_handle_24px.svg';
import { RgTabItem } from '../../../interfaces';
import { IRgTabs } from './rgTabsComponent';

const rgTabsTemplate = (context: IRgTabs): JSX.Element => {
    return (
        <FlexBox
            className={classnames(
                'rg-tabs',
            )}
            column="start stretch"
        >
            <div
                className={classnames(
                    'rg-tabs__header',
                    {
                        'rg-tabs__header--full': context.state.full,
                    },
                )}
                ref={(node: HTMLDivElement | null) => context.headerRef = node}
            >
                <div
                    className={classnames(
                        'rg-tabs__items-wrap',
                        {
                            'rg-tabs__items-wrap--full': context.state.full,
                        },
                    )}
                    ref={(node: HTMLDivElement | null) => context.itemsWrapRef = node}
                >
                    {
                        context.props.tabs
                            .filter((el: RgTabItem) => !el.hide)
                            .map((tab: RgTabItem, index: number) => {
                                return (
                                    <FlexBox
                                        key={index}
                                        className={classnames(
                                            'rg-tabs__header-item',
                                            {
                                                'rg-tabs__header-item--active': context.state.selectIndex === index,
                                                [`${tab.classItem}`]: !!tab.classItem,
                                            },
                                        )}
                                        onClick={() => context.selectTab(index)}
                                    >
                                        {
                                            tab.title
                                        }
                                    </FlexBox>
                                );
                            },
                        )
                    }
                </div>
            </div>
            <FlexBox
                className={classnames(
                    'rg-tabs__body',
                )}
            >
                {
                    context.props.tabs.length ? context.props.tabs[context.state.selectIndex].body : null
                }
            </FlexBox>
            {
                !!context.showLeftArrow() &&
                <div
                    className={classnames(
                        'rg-tabs__header-arrow',
                        {
                            'rg-tabs__header-arrow--full': context.state.full,
                        },
                    )}
                    onClick={context.goLeft}
                    ref={(node: HTMLDivElement | null) => context.arrowRightRef = node}
                >
                    {'<'}
                </div>
            }
            {
                !!context.showRightArrow() &&
                <div
                    className={classnames(
                        'rg-tabs__header-arrow',
                        'rg-tabs__header-arrow--right',
                        {
                            'rg-tabs__header-arrow--full': context.state.full,
                        },
                    )}
                    onClick={context.goRight}
                    ref={(node: HTMLDivElement | null) => context.arrowLeftRef = node}
                >
                    {'>'}
                </div>
            }
            {
                !!context.overflowContent &&
                <div
                    className={classnames(
                        'rg-tabs__show-full-block',
                        {
                            'rg-tabs__show-full-block--full': context.state.full,
                        },
                    )}
                    onClick={() => context.updateState(!context.state.full, 'full', context.checkFullView, 0)}
                    ref={(node: HTMLDivElement | null) => context.showFullRef = node}
                    dangerouslySetInnerHTML={{ __html: DRAG_HANDLE }}
                />
            }
        </FlexBox>
    );
};

export default rgTabsTemplate;
