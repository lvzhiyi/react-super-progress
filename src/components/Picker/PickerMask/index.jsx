/**
 * 选择器蒙版
 */

import React, { PureComponent } from 'react';
import classnames from 'classnames';
import './style.styl';

class PickerMask extends PureComponent {
    static defaultProps = {
        lang: {
            cancelBtn: '取消',
            okBtn: '确认'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            res: []
        };
    }

    onPickerChange = (text, index, col) => {
        const data = { item: text, index, col };
        const { res } = this.state;
        res[col] = data;
        this.setState({ res });
    };

    render() {
        const {
            transparent,
            lang = { cancelBtn: '取消', okBtn: '确认' },
            onCancel,
            onOk,
            onMaskClick,
            children,
            title = '请选择',
            show
        } = this.props;
        const clz = classnames({
            'Picker-mask': show && transparent,
            'Picker-mask-transparent': show && transparent,
            'Picker-mask-animate-fade-in': show,
            'Picker-mask-animate-fade-out': !show
        });

        const cls = classnames('Picker-mask-picker', {
            'Picker-mask-animate-slide-up': show,
            'Picker-mask-animate-slide-down': !show
        });

        const this_ = this;
        let newChildren = [];
        React.Children.forEach(children, function(child, i) {
            if (child) {
                let props = {
                    show: show,
                    key: i,
                    cascade: this_.props.cascade,
                    ...child.props,
                    onPickerChange(text, index) {
                        this_.onPickerChange(text, index, i);
                    }
                };
                newChildren.push(React.cloneElement(child, props));
            }
        });
        console.log(clz);
        return (
            <div>
                <div className={clz} onClick={onMaskClick}>
                    <div className={cls}>
                        <div className="Picker-mask-hd">
                            {onCancel && (
                                <a
                                    key="0"
                                    className="Picker-mask-action left"
                                    onClick={onCancel}
                                >
                                    {lang.cancelBtn}
                                </a>
                            )}
                            <span className="Picker-mask-title">{title}</span>
                            <a
                                key="1"
                                className="Picker-mask-action right"
                                onClick={() => onOk(this.state.res)}
                            >
                                {lang.okBtn}
                            </a>
                        </div>
                        <div className="Picker-mask-bd">{newChildren}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PickerMask;
