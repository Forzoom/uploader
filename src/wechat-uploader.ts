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
    return uploadImage(localId).then((_res) => {
        var serverId = _res.serverId; // 记录res
        return { localId, serverId };
    })
    .then(async (res) => {
        return {
            image: res.localId,
            serverId: res.serverId,
            base64: await getLocalImgData(localId),
        };
    })
    .catch((error) => {
        throw new Error(error.errMsg);
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
                            })
                            .catch((errMsg) => {
                                vm.$emit('error', errMsg);
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
                    .then(function({ image, serverId, base64 }) {
                        vm.add({ image, serverId, base64 });
                        if (localIds.length > 0) {
                            return vm.uploadWechatImages(localIds);
                        }
                    }).catch((errMsg) => {
                        throw new Error(errMsg)
                    });
            },
            transformImage: function(image) {
                return image.base64 ? image.base64 : image.image;
            },
        },
        mounted: function() {
            this.$on('click', function(index) {
                const images = this.images as WechatImage[];
                previewImage(images[index].image, images.map(image => image.image));
            });
        },
    })
}
