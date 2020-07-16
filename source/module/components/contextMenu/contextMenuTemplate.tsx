import { FlexBox } from '@romger/react-flex-layout';
import classnames from 'classnames';
import * as React from 'react';
import ReactSVG from 'react-svg';
// @ts-ignore
import MORE_VERT from '../../../assets/images/svg/ic_more_vert_24px.svg';
import { IContextMenuItem } from '../../../interfaces';
import { ContextMenuInterface } from './contextMenuComponent';

const contextMenuTemplate = (
    context: ContextMenuInterface,
): JSX.Element | false => {
    return (
        <div
            className={classnames('context-menu')}
        >
            <span
                className={classnames(
                    'context-menu__menu-icon',
                )}
                onClick={() => context.toggleMenu()}
                dangerouslySetInnerHTML={{ __html: MORE_VERT }}
            />
            {!!context.state.showMenu && (
                <div
                    ref={(node: HTMLDivElement | null) => (context.menu = node)}
                    className={classnames('context-menu__menu')}
                >
                    {context.props.items
                        .filter((el: IContextMenuItem) => !el.hide)
                        .map(
                        (item: IContextMenuItem, index: number) => (
                            <div
                                key={index}
                            >
                                <FlexBox
                                    row="start ctr"
                                    className={classnames(
                                        'context-menu__item-wrap',
                                        {
                                            'context-menu__item-wrap--pointer': !!item.onClick,
                                        },
                                    )}
                                    onClick={() => {
                                        if (!!item.onClick) {
                                            context.toggleMenu();
                                            item.onClick();
                                        }
                                    }}
                                >
                                    {!!item.icon && (
                                        <div
                                            className={classnames(
                                                'context-menu__icon-item-wrap',
                                            )}
                                        >
                                            <ReactSVG
                                                src={`assets/images/svg/${
                                                    item.icon
                                                }.svg`}
                                            />
                                        </div>
                                    )}
                                    <div
                                        className={classnames(
                                            'context-menu__text-item-wrap',
                                        )}
                                    >
                                        {item.title}
                                    </div>
                                </FlexBox>
                            </div>
                        ),
                    )}
                </div>
            )}
        </div>
    );
};

export default contextMenuTemplate;
