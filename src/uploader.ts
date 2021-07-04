import Vue from 'vue';
import {
    UploaderData, UploaderMethod, UploaderProp,
} from '../types/index';
import {
    header,
    footer,
} from './lib/constant';

/**
 * @load 当图片上传开始时
 * @finish 当图片上传结束时
 */
export default function factory(_Vue: typeof Vue) {
    return _Vue.extend<UploaderData<string>, UploaderMethod<string>, {}, UploaderProp>({
        name: 'Uploader',
        props: {
            /**
             * 允许上传图片个数
             */
            size: {
                type: Number,
                default: 1,
            },
            /**
             * 是否允许修改
             */
            canModify: {
                type: Boolean,
                default: true,
            },
            /**
             * 容器对象类
             */
            containerClass: {
                type: [ Object, Array, ],
                default() {
                    return {};
                },
            },
            /**
             * 容器对象样式
             */
            containerStyle: {
                type: Object,
                default() {
                    return {};
                },
            },
            /**
             * 图片对象类
             */
            imageClass: {
                type: [ Object, Array, ],
                default() {
                    return {};
                },
            },
            /**
             * 图片对象样式
             */
            imageStyle: {
                type: Object,
                default() {
                    return {};
                },
            },
            /**
             * wrap
             */
            imageWrapClass: {
                type: [ Object, Array, ],
                default() {
                    return {};
                },
            },
            /**
             * wrap
             */
            imageWrapStyle: {
                type: Object,
                default() {
                    return {};
                },
            },
            /**
             * 请求对象类
             */
            requestClass: {
                type: [ Object, Array, ],
                default() {
                    return {};
                },
            },
            /**
             * 请求对象样式
             */
            requestStyle: {
                type: Object,
                default() {
                    return {};
                },
            },
            /**
             * 删除按钮样式类
             */
            removeClass: {
                type: [ Object, Array, ],
                default() {
                    return {};
                },
            },
            /**
             * 删除按钮样式
             */
            removeStyle: {
                type: Object,
                default() {
                    return {};
                },
            },
            /**
             * 调用lazyload，因为无法确定存在vue-lazyload库，所以默认false
             */
            lazyload: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                // 包含所有图片的数组
                images: [],
            };
        },
        methods: {
            /**
             * 重置所有的images列表，不会触发任何的remove和add事件
             */
            setImages(images) {
                let tmp = [];
                for (let i = 0, len = images.length; i < len; i++) {
                    tmp.push(images[i]);
                }
                this.images = tmp;
            },
            /**
             * 添加图片
             *  将触发@add(image)事件
             *
             * @param {string} image
             *
             * @return {boolean} 成功返回true，否则返回false
             */
            add(image) {
                if (this.images.length < this.size) {
                    this.images.push(image);
                    this.$emit('add', image);
                    return true;
                }
                return false;
            },
            /**
             * 删除图片
             *  将触发@remove(index)事件
             *
             * @param {number} index
             *
             * @return {boolean} true表示删除成功，false表示失败
             */
            remove(index) {
                if (0 <= index && index < this.size) {
                    this.images.splice(index, 1);
                    this.$emit('remove', index);
                    return true;
                }
                return false;
            },
            /**
             * 删除所有的图片
             */
            removeAll() {
                for (let i = 0, len = this.images.length; i < len; i++) {
                    this.remove(i);
                }
                return true;
            },
            /**
             * 获得所有图片
             *
             * @return {Array<string>}
             */
            getImages() {
                return this.images.slice(0);
            },
            /**
             * 当点击图片时触发
             *
             * @param {number} index
             */
            onClickImage(index) {
                this.$emit('click', index);
            },
            /**
             * 当点击删除按钮时触发
             */
            onClickRemove(index) {
                this.remove(index);
            },
            /**
             * 当点击添加按钮时
             */
            onClickRequest() {
                this.$emit('request');
            },
            /**
             * 获得允许上传的容量
             */
            getSize() {
                return this.size;
            },
            /**
             * 获得当前已经上传的图片的数量
             */
            getCount() {
                return this.images.length;
            },
            /**
             * 获取image，在模板中使用
             */
            transformImage(image) {
                return image;
            }
        },
        template: header + footer,
    })
};
