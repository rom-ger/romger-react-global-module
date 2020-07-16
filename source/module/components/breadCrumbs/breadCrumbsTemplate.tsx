import { FlexBox } from '@romger/react-flex-layout';
import classnames from 'classnames';
import * as React from 'react';
import { BreadCrumbsItems } from '../../../interfaces';
import { BreadCrumbsInterface } from './breadCrumbsComponent';

const breadCrumbsTemplate = (
    context: BreadCrumbsInterface,
): JSX.Element | false => {
    return (
        <div>
            {!!context.props.items && !!context.props.items.length && (
                <FlexBox
                    rowWrap="start ctr"
                    className={classnames('bread-crumbs')}
                >
                    {context.props.items.filter((item: BreadCrumbsItems) => !item.hide)
                        .map((item: BreadCrumbsItems, key: number) => (
                            <FlexBox
                                key={key}
                                row="start ctr"
                            >
                                <div
                                    className={classnames(
                                        'bread-crumbs__title',
                                        {
                                            'bread-crumbs__title--disabled': !item.state,
                                        },
                                    )}
                                    onClick={() =>
                                        item.state
                                            ? context.goToState(item.state)
                                            : null
                                    }
                                >
                                    {item.title}
                                </div>
                                {key !== context.props.items.length - 1 && (
                                    <div
                                        className={classnames(
                                            'bread-crumbs__slash',
                                        )}
                                    >
                                        /
                                    </div>
                                )}
                            </FlexBox>
                        ),
                    )}
                </FlexBox>
            )}
        </div>
    );
};

export default breadCrumbsTemplate;
