declare module '*/style.module' {
    const styles: Partial<any>;
    export default styles;
}

declare module 'jroll' {
    interface jrollSelector {}

    export default class jroll {
        constructor(selector: jrollSelector, options?: any);
    }
}

declare function rem(size: number): string;
