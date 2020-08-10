import { IG6GraphEvent, ShapeStyle } from '../../types';
import Base from '../base';
interface FisheyeConfig {
    trigger?: 'mousemove' | 'click';
    d?: number;
    r?: number;
    delegateStyle?: ShapeStyle;
    showLabel?: boolean;
}
export default class Fisheye extends Base {
    constructor(cfg?: FisheyeConfig);
    getDefaultCfgs(): FisheyeConfig;
    getEvents(): {
        mousemove: string;
        click?: undefined;
    } | {
        click: string;
        mousemove?: undefined;
    };
    init(): void;
    /**
     * mousemove 或 click 事件的响应函数
     * @param param
     */
    protected magnify(e: IG6GraphEvent): void;
    /**
     * 恢复缓存的被缩放的节点
     */
    protected restoreCache(): void;
    updateParams(cfg: FisheyeConfig): void;
    /**
     * 放大镜的图形
     * @param {Point} mCenter
     * @param {number} r
     */
    private updateDelegate;
    clear(): void;
    destroy(): void;
}
export {};
