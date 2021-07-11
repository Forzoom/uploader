import { VueConstructor } from 'vue/types/umd';
import { CombinedVueInstance, Vue } from 'vue/types/vue';

export interface UploaderProp {
    /** 允许上传图片个数，默认是1 */
    size: number;
    /** 是否允许修改，默认true */
    canModify: boolean;
    /** 容器对象类 */
    containerClass: any;
    /** 容器对象样式 */
    containerStyle: any;
    /** 图片对象类 */
    imageClass: any;
    /** 图片对象样式 */
    imageStyle: any;
    /** wrap */
    imageWrapClass: any;
    /** wrap */
    imageWrapStyle: any;
    /** 请求对象类 */
    requestClass: any;
    /** 请求对象样式 */
    requestStyle: any;
    /** 删除按钮样式类 */
    removeClass: any;
    /** 删除按钮样式 */
    removeStyle: any;
    /** 调用lazyload，因为无法确定存在vue-lazyload库，所以默认false */
    lazyload: boolean;
}
export interface UploaderData<ImageType> {
    images: ImageType[];
}
export interface UploaderMethod<ImageType> {
    /**
     * 重置所有的images列表，不会触发任何的remove和add事件
     */
    setImages(images: ImageType[]): void;
    /**
     * 添加图片，将触发@add(image)事件
     * @param {T} image
     * @return {boolean} 成功返回true，否则返回false
     */
    add(image: ImageType): boolean;
    /**
     * 删除图片
     * 将触发@remove(index)事件
     * @param {number} index
     * @return {boolean} true表示删除成功，false表示失败
     */
    remove(index: number): boolean;
    /**
     * 删除所有的图片
     */
    removeAll(): boolean;
    /**
     * 获得所有图片
     * @return {ImageType[]}
     */
    getImages(): ImageType[];
    /**
     * 当点击图片时触发
     * @param {number} index
     */
    onClickImage(index: number): void;
    /**
     * 当点击删除按钮时触发
     */
    onClickRemove(index: number): void;
    /**
     * 当点击添加按钮时
     */
    onClickRequest(): void;
    /**
     * 获得允许上传的容量
     */
    getSize(): number;
    /**
     * 获得当前已经上传的图片的数量
     */
    getCount(): number;
    /**
     * image类型转换
     */
    transformImage(image: ImageType): string;
}
export interface BasicImage {
    key?: string;
    url: string;
}
export interface WechatImage extends BasicImage {
    /** @deprecated */
    image: string | null;
    localId?: string | null;
    serverId?: string | null;
}
/**
 * InputUploader中所存储的内容
 */
export interface FileImage extends BasicImage {
    /** file文件 */
    file?: File;
    /** 由file转换成的objectURL对象 */
    objectUrl?: string;
}
export interface WechatUploaderProp {
    useWechatPreview: boolean;
}
export interface WechatUploaderMethod {
    /**
     * 发起图片上传请求
     */
    request(): Promise<void>;
    /**
     * 图片上传
     */
    uploadWechatImages(localIds: string[]): Promise<void>;
}
export interface InputUploaderProp {
    accept?: string;
}
export interface UploaderOptions {
    transformWXLocalImageData: boolean;
}

export type UploaderComponnet = CombinedVueInstance<Vue, UploaderData<string>, UploaderMethod<string>, object, UploaderProp>;
export type WechatUploaderComponent<T extends WechatImage = WechatImage> = CombinedVueInstance<Vue, UploaderData<T>, UploaderMethod<T> & WechatUploaderMethod, object, UploaderProp & WechatUploaderProp>;
export type InputUploaderComponent = CombinedVueInstance<Vue, UploaderData<FileImage>, UploaderMethod<FileImage>, object, UploaderProp & InputUploaderProp>;
export const UploaderFactory: (Vue: any) => VueConstructor;
export const WechatUploaderFactory: (Vue: any) => VueConstructor;
export const InputUploaderFactory: (Vue: any) => VueConstructor;
export declare function install(vue: typeof Vue, options: UploaderOptions): void;
