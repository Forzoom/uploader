import { CombinedVueInstance, Vue } from 'vue/types/vue';

declare module '@forzoom/uploader' {
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
    }
    export interface WechatImage {
        serverId: string;
        image: string;
    }
    export interface WechatUploaderMethod {
        request(): Promise<void>;
        uploadWechatImages(localIds: string[]): Promise<void>;
    }

    type UploaderComponnet = CombinedVueInstance<Vue, UploaderData<string>, UploaderMethod<string>, object, UploaderProp>;
    type WechatUploaderComponent = CombinedVueInstance<Vue, UploaderData<WechatImage>, UploaderMethod<WechatImage> & WechatUploaderMethod, object, UploaderProp>;
    const Uploader: UploaderComponnet;
    const WechatUploader: WechatUploaderComponent;
}