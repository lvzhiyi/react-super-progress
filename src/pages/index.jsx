import React, { Component } from 'react';
import { Progress } from 'react-super-progress';
import './index.styl';

export default class ProgressPage extends Component {
    render() {
        const other3 = [
            {
                r: 200,
                color: ['#3AB078', '#000'],
                value: 100,
                type: 'rect',
                width: 10,
            },
            {
                r: 100,
                color: ['#3AB078', '#000'],
                value: 90,
                type: 'rect',
                width: 200,
            }];
        return (
            <div className='wapper'>
                <div>
                    <Progress data={other3}></Progress><br/>
                </div>
            </div>
        );
    }
}
