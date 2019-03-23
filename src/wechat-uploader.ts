import Vue from 'vue';
import {
    previewImage,
    chooseImage,
    uploadImage,
    getLocalImgData,
} from './lib/wx';
import {
    UploaderData,
    WechatImage,
    UploaderOptions,
} from '../types/index';
import UploaderFactory from './uploader';

function noop<T>(_: T) {
    return _;
}

/**
 *
 *
 * @return {Promise} {image, serverId}
 */
function uploadWechatImage(localId: string, transformLocalImageData: boolean) {
    var serverId = null;
    return uploadImage(localId).then((_res) => {
        serverId = _res.serverId; // 记录res
        return localId;
    })
    .then((value) => {
        return transformLocalImageData ? getLocalImgData(value) : noop<string>(value)
    }) // 权限检测可能不应该这样使用
    .then((imageData) => {
        return {
            image: imageData,
            serverId: serverId,
        }
    });
}

/**
 * 
 */
export default function factory(_Vue: typeof Vue, options: UploaderOptions) {
    const Uploader = UploaderFactory(_Vue);
    return Uploader.extend<UploaderData<WechatImage>, {}, {}, {}>({
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
            onClickRequest: function() {
                this.request();
            },
            /**
             * 请求图片上传
             */
            request: function() {
                var vm = this;
                vm.$emit('startRequest')
                return chooseImage(vm.size - vm.images.length)
                    .then((res) => {
                        vm.$emit('endRequest');
                        var localIds = res.localIds;
                        if (localIds.length > 0) {
                            vm.$emit('choose', res);
                            vm.$emit('load');
                            return vm.uploadWechatImages(localIds).then(function() {
                                vm.$emit('finish');
                            });
                        }
                    }).catch(() => {
                        vm.$emit('endRequest');
                    });
            },
            /**
             * 上传多张图片，需要保证一张上传完成之后，再上传另外一张
             */
            uploadWechatImages: function(localIds) {
                var vm = this;
                var localId = localIds.shift();
                return uploadWechatImage(localId, options.transformWXLocalImageData)
                    .then(function({ image, serverId, }) {
                        vm.add({ image, serverId });
                        if (localIds.length > 0) {
                            return vm.uploadWechatImages(localIds);
                        }
                    });
            },
            transformImage: function(image) {
                return image.image;
            },
        },
        mounted: function() {
            this.$on('click', function(index) {
                previewImage(this.images[index].image, this.images.map(image => image.image));
            });
        },
    })
}
