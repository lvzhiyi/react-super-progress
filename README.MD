# react-super-progress

Progress Bar 、rect Bar and pei progress

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-progress.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-super-progress
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://www.npmjs.com/package/react-super-progress
[download-url]: https://www.npmjs.com/package/react-super-progress

## Example

https://www.lzyweb.cn/progress-docs/#/elements/components/Progress

## Screenshots

<img src="http://120.78.184.181/img/p1.jpeg" />
<img src="http://120.78.184.181/img/p2.jpeg" />
<img src="http://120.78.184.181/img/p3.jpeg" />
<img src="http://120.78.184.181/img/p4.jpeg" />

## Browsers

* support IE9+, Chrome, Firefox, Safari

## Install

```ssh
    npm install react-super-progress -S
```

## Usage

```jsx
import { Progress } from 'react-super-progress';

ReactDOM.render(<div>
  <Progress>50%</Progress>
</div>, container);
```

## API
### data 接收一个数组对象，形成单个或多个进度形状

|   属性         |                       说明                       |  类型   |   默认值    |
| ---------------| ------------------------------------------------ | ------- | ----------- |
| type     | 圆形类型，支持三总类型:'circle':圆形进度圈，'rect':方形进度圈, 'dashedCircle':齿轮进度圈  | string  | ``circle`` |
| width     | 圆形厚度，                                                | number  | ``65`` |
| value   | 进度值                                                   | number  | ``100`` |
| r      | 半径(大小)                                                  | number  | ``160`` |
| color  | 接收一个字符串或者一个数组颜色作为渐变色              | array or string  | ``['#3AB078', '#000']`` |

> 注：当type='dashedCircle'时需要指定额外参数

|   属性         |                       说明                       |  类型   |   默认值    |
| ---------------| ------------------------------------------------ | ------- | ----------- |
| divide     | 齿轮被一圈所平分的个数(决定齿轮间间隙)，                    | number  | ``48`` |
| height     | 齿轮厚度，                                             | number  | ``65`` |
| rx  | 齿轮横向圆角                                                   | number  | ``4`` |
| ry    | 齿轮纵向圆角                                                 | number  | ``4`` |


## 其他API

|   属性         |                       说明                       |  类型   |   默认值    |
| ---------------| ------------------------------------------------ | ------- | ----------- |
| centerTextClass | 中心文本自定class，                                | string  | ``null`` |
| children  | 自定义其他中心文本                                      | ReactElement  | ``null`` |


## Development

```
npm install
npm start
```
