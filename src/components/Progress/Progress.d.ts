interface dataObj{
    /**
     * @param object <r: 半径，width: 圈厚度， size: 圈大小， value: 进度值， color 颜色>
     *
     * @description 单圈传入一个对象，多圈传入已个数组
     */
    color: string | Array<string>
    r: number,
    width: number,
    value: number,
    type: string,
    dash?: dashObj
}

type dashObj = {
    divide: number
    width: number,
    height: number,
    rx: number,
    ry: number,
    style?: any,
    subType: any
}

interface ProgressProps<T>{
    data: Array<T>
    centerTextClass: string
    centerText: React.ReactElement<any>
}

