/**
 * 动态设置rem
 */

const BASE_SIZE = 50; // 基本字体大小
const MAX_SIZE = 80; // 最大字体大小
const DESIGN_WIDTH = 375; // iphone 6

const htmlEl = document.querySelector('html');
let fontSize = 50;

let setFontSize = size => {
    htmlEl.style.fontSize = `${size}px`;
    fontSize = size;
};

let calc = () => {
    const device_width = document.body.clientWidth || window.innerWidth;
    // let fontSize = BASE_SIZE;
    // if (device_width < DESIGN_WIDTH) {
    //     return setFontSize(fontSize);
    // }
    let scale = device_width / DESIGN_WIDTH;
    let distSize = scale * BASE_SIZE;
    if (distSize > MAX_SIZE) {
        distSize = MAX_SIZE;
    }
    setFontSize(Math.round(distSize));
};

window.addEventListener('resize', calc);

document.addEventListener('DOMContentLoaded', calc);

window.rem = size => {
    return size / BASE_SIZE + 'rem';
};

window.renderPx = size => {
    return Math.round(size / BASE_SIZE * fontSize);
};

export default window.rem;
export const renderPx = window.renderPx;
