import React, { PureComponent } from 'react';
import classnames from 'classnames';
import './style.styl';
// const getCssNum = cssVal => Number(cssVal.substring(0, cssVal.length - 2));

class PickerColumn extends PureComponent {
    static defaultProps = {
        data: [],
        itemHeight: 25,
        indicatorTop: 40,
        indicatorHeight: 25,
        animation: true,
        defaultIndex: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            translate: 0,
            selectedIndex: 0,
            animating: props.animation,
            touching: false,
            ogY: 0,
            ogTranslate: 0,
            touchId: undefined,
            totalHeight: 0
        };
        this.isTracking = false;
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
    }

    componentDidMount() {
        this.adjustPosition();
        const { component } = this;
        component.addEventListener('touchstart', this.handleTouchStart, false);
        component.addEventListener('touchmove', this.handleTouchMove, false);
        component.addEventListener('touchend', this.handleTouchEnd, false);
    }

    componentWillUnmount() {
        const { component } = this;
        component.removeEventListener(
            'touchstart',
            this.handleTouchStart,
            false
        );
        component.removeEventListener('touchmove', this.handleTouchMove, false);
        component.removeEventListener('touchend', this.handleTouchEnd, false);
    }

    s = 0;

    componentWillUpdate(props) {
        if (props.show && this.s === 0) {
            this.adjustPosition();
            this.s++;
        }
        if (!props.show) this.s = 0;
    }

    componentWillReceiveProps(props) {
        if (JSON.stringify(props.data) !== JSON.stringify(this.props.data)) {
            const { onPickerChange, defaultIndex, cascade } = this.props;
            onPickerChange && onPickerChange(props.data[0], defaultIndex);
            const newProps = { ...props };
            const SIndex = this.adjustSelectedIndex();
            if (!cascade) {
                if (SIndex > props.data.length - 1) {
                    newProps.defaultIndex = props.data.length - 1;
                } else {
                    newProps.defaultIndex = SIndex;
                }
            } else {
                newProps.defaultIndex = 0;
            }
            this.adjustPosition(newProps);

            // newProps.defaultIndex = 0
        }
    }

    adjustPosition(props) {
        const { itemHeight, indicatorTop, onPickerChange } = this.props;
        const { data, defaultIndex } = props || this.props;
        const totalHeight = data.length * itemHeight;
        let { translate } = this.state;
        translate = indicatorTop - itemHeight * defaultIndex;
        // if(this.num === 0){
        //     this.num++;
        onPickerChange && onPickerChange(data[defaultIndex], defaultIndex);
        // }
        this.setState(
            {
                selectedIndex: defaultIndex,
                ogTranslate: translate,
                totalHeight,
                translate
            },
            () => {
                if (defaultIndex !== 0) this.updateSelected();
            }
        );
    }

    adjustSelectedIndex() {
        const {
            data,
            itemHeight = 35,
            indicatorTop = 45,
            indicatorHeight = 35
        } = this.props;
        const { translate } = this.state;
        let selectedIndex = 0;

        for (let i = 0; i < data.length; i++) {
            if (
                itemHeight * i + translate >= indicatorTop &&
                (i + 1) * itemHeight + translate <=
                    indicatorTop + indicatorHeight
            ) {
                selectedIndex = i;
                break;
            }
        }

        return selectedIndex;
    }

    updateSelected(oldTranslate) {
        const { data, onPickerChange, colChange, disable } = this.props;
        const selectedIndex = this.adjustSelectedIndex();
        if (oldTranslate && disable) {
            this.setState({
                translate: oldTranslate
            });
            return;
        }
        if (onPickerChange && data[selectedIndex]) {
            onPickerChange(data[selectedIndex], selectedIndex);
            colChange && colChange(data[selectedIndex], selectedIndex);
        }
    }

    handleTouchStart(e) {
        e.preventDefault();
        e.stopPropagation();
        this.isTracking = true;
        const { data } = this.props;
        const { touching, translate } = this.state;
        if (touching || data.length <= 1) return;
        this.setState({
            touching: true,
            ogTranslate: translate,
            touchId: e.targetTouches[0].identifier,
            ogY: e.targetTouches[0].pageY - translate,
            animating: false
        });
    }

    handleTouchMove(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTracking) {
            return;
        }
        const { data } = this.props;
        const { touching, touchId, ogY } = this.state;
        if (!touching || data.length <= 1) return;
        if (e.targetTouches[0].identifier !== touchId) return;

        const pageY = e.targetTouches[0].pageY;
        const diffY = pageY - ogY;

        this.setState({
            translate: diffY
        });
    }

    handleTouchEnd(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTracking) {
            return;
        }
        this.isTracking = false;
        const { data, indicatorTop, indicatorHeight, itemHeight } = this.props;
        const { touching, ogTranslate, totalHeight } = this.state;
        let { translate } = this.state;
        if (!touching || data.length <= 1) return;

        if (Math.abs(translate - ogTranslate) < itemHeight * 0.22) {
            translate = ogTranslate;
        } else if (translate > indicatorTop) {
            translate = indicatorTop;
        } else if (translate + totalHeight < indicatorTop + indicatorHeight) {
            translate = indicatorTop + indicatorHeight - totalHeight;
        } else {
            let step = 0,
                adjust = 0,
                diff = (translate - ogTranslate) / itemHeight;

            if (Math.abs(diff) < 1) {
                step = diff > 0 ? 1 : -1;
            } else {
                adjust = Math.abs((diff % 1) * 100) > 50 ? 1 : 0;
                step =
                    diff > 0
                        ? Math.floor(diff) + adjust
                        : Math.ceil(diff) - adjust;
            }

            translate = ogTranslate + step * itemHeight;
        }
        this.setState(
            {
                touching: false,
                ogY: 0,
                touchId: undefined,
                ogTranslate: 0,
                animating: true,
                translate
            },
            this.updateSelected.bind(this, ogTranslate)
        );
    }

    render() {
        const { data, className } = this.props;
        const { translate, animating } = this.state;

        const styles = {
            transform: `translate(0, ${translate}px)`,
            transition: animating ? 'transform .3s' : 'none'
        };

        return (
            <div
                className={classnames('Picker-column', className)}
                ref={(node)=>{this.component = node;}}
            >
                <div className="Picker-column-mask" />
                <div
                    className={`Picker-column-indicator
                        'Picker-column-indicator'
                    }`}
                />
                <div className="Picker-column-content" style={styles}>
                    {data &&
                        data.map((item, idx) => {
                            const itemCls = classnames(
                                `Picker-column-item
                                    'Picker-column-item'
                                `,
                                {
                                    disabled: item.disable
                                }
                            );
                            {
                                /* const headNode = typeof head === 'function' ? head() : head; */
                            }
                            return (
                                <div
                                    key={idx}
                                    data-value={item.value}
                                    className={itemCls}
                                >
                                    {item.text}
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

export default PickerColumn;
