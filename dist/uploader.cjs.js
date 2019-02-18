'use strict';

var header = '<div class="ro-uploader-wrap" :class="containerClass" :style="containerStyle">';
var footer = '<div v-for="(image, index) in images" '
    + ':key="index"'
    + 'class="ro-uploader-image-wrap"'
    + ':class="imageWrapClass"'
    + ':style="imageWrapStyle">'
    + '<div v-if="!lazyload" '
    + 'class="ro-uploader-image"'
    + ':class="imageClass"'
    + ':style="[{\'background-image\': \'url(\' + transformImage(image) + \')\'}, imageStyle]"'
    + '@click="onClickImage(index)">'
    + '</div>'
    + '<div v-else '
    + 'class="ro-uploader-image"'
    + ':class="imageClass"'
    + 'v-lazy:background-image="image"'
    + ':style="[imageStyle]"'
    + '@click="onClickImage(index)">'
    + '</div>'
    + '<div v-if="canModify" class="ro-uploader-remove" :class="removeClass" :style="removeStyle" @click="onClickRemove(index)"></div>'
    + '</div>'
    + '<slot name="request">'
    + '<div class="ro-uploader-image-wrap ro-uploader-request" '
    + 'v-if="images.length < size && canModify"'
    + '@click="onClickRequest"'
    + ':class="requestClass"'
    + ':style="requestStyle">'
    + '</div>'
    + '</slot>'
    + '</div>';

/**
 * @load 当图片上传开始时
 * @finish 当图片上传结束时
 */
function factory(_Vue) {
    return _Vue.extend({
        name: 'ROUploader',
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
                type: [Object, Array,],
                default: function () {
                    return {};
                },
            },
            /**
             * 容器对象样式
             */
            containerStyle: {
                type: Object,
                default: function () {
                    return {};
                },
            },
            /**
             * 图片对象类
             */
            imageClass: {
                type: [Object, Array,],
                default: function () {
                    return {};
                },
            },
            /**
             * 图片对象样式
             */
            imageStyle: {
                type: Object,
                default: function () {
                    return {};
                },
            },
            /**
             * wrap
             */
            imageWrapClass: {
                type: [Object, Array,],
                default: function () {
                    return {};
                },
            },
            /**
             * wrap
             */
            imageWrapStyle: {
                type: Object,
                default: function () {
                    return {};
                },
            },
            /**
             * 请求对象类
             */
            requestClass: {
                type: [Object, Array,],
                default: function () {
                    return {};
                },
            },
            /**
             * 请求对象样式
             */
            requestStyle: {
                type: Object,
                default: function () {
                    return {};
                },
            },
            /**
             * 删除按钮样式类
             */
            removeClass: {
                type: [Object, Array,],
                default: function () {
                    return {};
                },
            },
            /**
             * 删除按钮样式
             */
            removeStyle: {
                type: Object,
                default: function () {
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
        data: function () {
            return {
                // 包含所有图片的数组
                images: [],
            };
        },
        methods: {
            /**
             * 重置所有的images列表，不会触发任何的remove和add事件
             */
            setImages: function (images) {
                var tmp = [];
                for (var i = 0, len = images.length; i < len; i++) {
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
            add: function (image) {
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
            remove: function (index) {
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
            removeAll: function () {
                for (var i = 0, len = this.images.length; i < len; i++) {
                    this.remove(i);
                }
                return true;
            },
            /**
             * 获得所有图片
             *
             * @return {Array<string>}
             */
            getImages: function () {
                return this.images.slice(0);
            },
            /**
             * 当点击图片时触发
             *
             * @param {number} index
             */
            onClickImage: function (index) {
                this.$emit('click', index);
            },
            /**
             * 当点击删除按钮时触发
             */
            onClickRemove: function (index) {
                this.remove(index);
            },
            /**
             * 当点击添加按钮时
             */
            onClickRequest: function () {
                this.$emit('request');
            },
            /**
             * 获得允许上传的容量
             */
            getSize: function () {
                return this.size;
            },
            /**
             * 获得当前已经上传的图片的数量
             */
            getCount: function () {
                return this.images.length;
            },
            /**
             * 获取image
             */
            transformImage: function (image) {
                return image;
            }
        },
        template: header + footer,
    });
}

var isIOS = /iPhone/.test(navigator.userAgent);
function previewImage(image, images) {
    wx.previewImage({
        current: image,
        urls: images,
    });
}
/**
 * @return {Promise} res
 *  - localIds: string[]
 */
function chooseImage(count) {
    return new Promise(function (resolve, reject) {
        wx.chooseImage({
            count: count,
            sizeType: ['compressed'],
            success: function (res) {
                return resolve(res);
            },
        });
    });
}
/**
 * 默认不显示progress
 * @param localId
 *
 * @return {Promise} res
 *  - serverId
 */
function uploadImage(localId) {
    return new Promise(function (resolve, reject) {
        wx.uploadImage({
            localId: localId,
            isShowProgressTips: 0,
            success: function (res) {
                return resolve(res);
            },
        });
    });
}
/**
 * @param localId
 *
 * @return {Promise} imageData
 */
function getLocalImgData(localId) {
    if (!isIOS || !window.__wxjs_is_wkwebview) {
        return localId;
    }
    return new Promise(function (resolve, reject) {
        wx.getLocalImgData({
            localId: localId,
            success: function (res) {
                return resolve(res.localData);
            },
        });
    });
}

function noop(_) {
    return _;
}
/**
 *
 *
 * @return {Promise} {image, serverId}
 */
function uploadWechatImage(localId, transformLocalImageData) {
    var serverId = null;
    return uploadImage(localId).then(function (_res) {
        serverId = _res.serverId; // 记录res
        return localId;
    })
        .then(function (value) {
        return transformLocalImageData ? getLocalImgData(value) : noop(value);
    }) // 权限检测可能不应该这样使用
        .then(function (imageData) {
        return {
            image: imageData,
            serverId: serverId,
        };
    });
}
/**
 *
 */
function factory$1(_Vue, options) {
    var Uploader = factory(_Vue);
    return Uploader.extend({
        name: 'WechatUploader',
        props: {
            /**
             * 是否使用微信的预览内容
             */
            useWechatPreview: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
            /**
             * 要求添加新的图片
             */
            onClickRequest: function () {
                this.request();
            },
            /**
             * 请求图片上传
             */
            request: function () {
                var vm = this;
                return chooseImage(vm.size - vm.images.length)
                    .then(function (res) {
                    var localIds = res.localIds;
                    if (localIds.length > 0) {
                        vm.$emit('choose', res);
                        vm.$emit('load');
                        return vm.uploadWechatImages(localIds).then(function () {
                            vm.$emit('finish');
                        });
                    }
                });
            },
            /**
             * 上传多张图片，需要保证一张上传完成之后，再上传另外一张
             */
            uploadWechatImages: function (localIds) {
                var vm = this;
                var localId = localIds.shift();
                return uploadWechatImage(localId, options.transformWXLocalImageData)
                    .then(function (_a) {
                    var image = _a.image, serverId = _a.serverId;
                    vm.add({ image: image, serverId: serverId });
                    if (localIds.length > 0) {
                        return vm.uploadWechatImages(localIds);
                    }
                });
            },
            transformImage: function (image) {
                return image.image;
            },
        },
        mounted: function () {
            this.$on('click', function (index) {
                previewImage(this.images[index].image, this.images.map(function (image) { return image.image; }));
            });
        },
    });
}

/**
 *
 */
function factory$2(_Vue, options) {
    var Uploader = factory(_Vue);
    return Uploader.extend({
        name: 'InputUploader',
        methods: {
            /**
             * 要求添加新的图片
             */
            onClickRequest: function () {
                this.request();
            },
            /**
             * 请求图片上传
             */
            request: function () {
                var $input = this.$refs.fileInput;
                console.log(this.$refs);
                if ($input) {
                    $input.click();
                }
            },
        },
        template: header
            + '<input ref="fileInput" class="ro-uploader-input" type="file" :multiple="(size - images.length) > 1" />'
            + footer,
    });
}

var installed = false;
function install(vue, options) {
    if (installed) {
        return;
    }
    installed = true;
    vue.component('Uploader', factory(vue));
    vue.component('WechatUploader', factory$1(vue, options));
    vue.component('InputUploader', factory$2(vue, options));
}

module.exports = install;
