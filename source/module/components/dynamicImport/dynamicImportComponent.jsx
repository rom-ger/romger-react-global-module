import * as React from 'react';

export default class DynamicImport extends React.Component {
    state = {
        component: null,
    }

    componentWillMount() {
        this.props.load()
            .then((component) => {
                this.setState(() => ({
                    component: component.default
                        ? component.default
                        : component,
                }));
            });
    }

    /**
     * Получить компонент
     */
    getComponent = (component, props) => (!component
        ? null
        : React.createElement(component, {...props}))

    render() {
        return this.getComponent(this.state.component, this.props.propsParent);
    }
}
