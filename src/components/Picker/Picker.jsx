/**
 * 单条选择
 */

import React, { PureComponent } from 'react';
import Portal from '../Portal/Portal';
import PickerMask from './PickerMask';
import PickerColumn from './PickerColumn';
class Picker extends PureComponent {
    static defaultProps = {
        show: false,
        transparent: false
    };

    static PickerColumn = PickerColumn;

    constructor(props) {
        super(props);
    }

    render() {
        const {
            lang,
            title,
            transparent,
            show,
            onMaskClick,
            onCancel,
            onOk,
            cascade
        } = this.props;
        return (
            <Portal>
                <PickerMask
                    transparent={!transparent}
                    lang={lang}
                    title={title}
                    onOk={item => onOk(item)}
                    onMaskClick={onMaskClick}
                    onCancel={onCancel}
                    show={show}
                    cascade={cascade}
                >
                    {this.props.children}
                </PickerMask>
            </Portal>
        );
    }
}

export default Picker;
