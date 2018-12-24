import React from 'react';
import './style.styl';
import { isArray } from 'lodash';
import { gradientColor } from '../../utils/index';

const computedCi = (r:number) => 2 * Math.PI * r;
const computedRectCi = (r:number) => r * 4;
const computedPro = (data:number, r:number, ci:Function) => data / 100 * ci(r);
const computedVal = (i:number, length:number) => {
    if(i == 0){
        return 0
    }else if(i == length - 1){
        return 100
    }else{
        return 100 / (length - 1) * i
    }
}

class Progress extends React.PureComponent<ProgressProps<dataObj>> {
    static defaultProps = {
        data: [{
            width: 25,
            r: 200,
            color: '#c1bbbb',
            value: 100,
            type: 'circle',
        },
        {
            width: 25,
            r: 200,
            color: ['#3AB078', '#000'],
            value: 50,
            type: 'circle',
        }],
    };

    scale: number

    viewContainer: number

    viewBox: number

    constructor(props){
        super(props)
        this.scale = 2;
        this.viewContainer = null;
        this.viewBox = null;
    }

    itemTypes = (item,maxR,hashId,i,maxItem) => {
        const scaleR = item.r * this.scale;
        const rX = maxR + item.width / 2 - maxItem.width / 2;
        const rY = maxR + maxItem.width / 2;
        const types = {
            dashCircle:() => {
                const { divide, color, height, width, rx, ry } = item;
                const perPro = Math.floor(item.value / 100 * divide) + 1;
                const divideDeg = 360 / divide;
                const colors = gradientColor(color[0],color[1],divide/2).concat(gradientColor(color[0],color[1],divide/2).reverse());
                const colorArr = isArray(color) ? colors : ''
                return Array.apply(null,{ length:divide }).map((it:undefined, index:number) => {
                    const styles = {'fill': colorArr ? colorArr[index] : color,};
                    return  index + 1 <= perPro && <rect
                    x={this.viewBox / 2 - width - (maxItem.width - width) }
                    y={maxR - scaleR}
                    width={width}
                    height={height}
                    rx={rx}
                    ry={ry}
                    style={styles}
                    key={`${index}dash`}
                    transform={`rotate(${(index)*divideDeg + 90}, ${rX} ${rY})`}
                    />
                })
            },
            circle:() => {
                return  <circle
                    cx={rX}
                    cy={rY}
                    r={scaleR}
                    className="grad-cir"
                    strokeWidth={item.width}
                    stroke={`url(#${hashId + i})`}
                    fill="none"
                    strokeDasharray={`${computedPro(item.value,scaleR,computedCi)}
                    ${computedCi(scaleR)}`}>
                </circle>
            },
            rect:() => {
                const mend = maxItem.width - item.width;
                return  <rect
                    x={maxR - scaleR}
                    y={maxR - scaleR + item.width/2}
                    width={scaleR * 2 + mend}
                    height={scaleR * 2 + mend}
                    strokeWidth={item.width}
                    stroke={`url(#${hashId + i})`}
                    fill="none"
                    transform={`rotate(90, ${maxR} ${maxR + item.width/2})`}
                    strokeDasharray={`${computedPro(item.value,scaleR * 2 + mend,computedRectCi)}
                    ${computedRectCi(scaleR * 2 + mend)}`}/>
            }
        }
        return types[item.type];
    }

    render() {
        const { data, centerTextClass, children } = this.props;
        const colors = data.map((item) => {
            return item.color
        })
        const mapR = data.map((item:any)  => {
            return item.r * this.scale + item.width / 2
        })
        const maxR = Math.max.apply(null,mapR);
        const maxItem = data.find((item:any)=>{
            return maxR == item.r * this.scale + item.width / 2
        })
        const hashId = Math.floor(Math.random() * 1000);
        this.viewContainer = maxR / this.scale + maxItem.width;
        this.viewBox = maxR * this.scale + maxItem.width;
        return (
            <div className='annular'>
                <div className="outer">
                    <svg width={this.viewContainer} height={this.viewContainer} viewBox={`0 0 ${this.viewBox} ${this.viewBox}`}>
                        <defs>
                            {
                                colors.map((item: string[] | string, i:number) => (
                                    <linearGradient key={i} x1="1" y1="0" x2="0" y2="0" id={`${hashId + i}`}>
                                        {
                                            isArray(item) ?
                                            item.map((it, i) => (
                                                <stop key={`${i}stop`} offset={`${computedVal(i, item.length)}%`} stopColor={it}></stop>
                                            )) :
                                            <stop offset='100%' stopColor={item}></stop>
                                        }
                                    </linearGradient>
                                ))
                            }
                        </defs>
                            {
                                data.map((item:dataObj, i:number) => (
                                    <g key={i}  transform={`matrix(0,-1,1,0,0,${maxR * this.scale + (item.width / 2)})`}>
                                        {
                                            this.itemTypes(item,maxR,hashId,i,maxItem)()
                                        }
                                    </g>
                                ))
                            }
                    </svg>
                    <div className={'num ' + centerTextClass}>
                        {children || '50%'}
                    </div>
                </div>
            </div>
        );
    }
}

export default Progress;
