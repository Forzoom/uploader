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

/**
 *
 *
 * @return {Promise} {image, serverId}
 */
function uploadWechatImage(localId: string, transformLocalImageData: boolean) {
    return uploadImage(localId).then((_res) => {
        let serverId = _res.serverId; // 记录res
        return { localId, serverId };
    })
    .then((res) => {
        return new Promise((resolve) => {
            getLocalImgData(localId).then((base64) => {
                resolve({
                    image: res.localId,
                    serverId: res.serverId,
                    base64,
                });
            });
        });
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
            onClickRequest() {
                this.request();
            },
            /**
             * 请求图片上传
             */
            request() {
                let vm = this;
                vm.$emit('startRequest')
                return chooseImage(Math.min(9, vm.size - vm.images.length))
                    .then((res) => {
                        vm.$emit('endRequest');
                        let localIds = res.localIds;
                        if (localIds.length === 0) {
                            return;
                        }

                        vm.$emit('choose', res);
                        vm.$emit('load');
                        vm.$emit('startRequest')
                        return vm.uploadWechatImages(localIds).then(function() {
                            vm.$emit('finish');
                            vm.$emit('endRequest');
                        })
                        .catch((errMsg) => {
                            vm.$emit('error', errMsg);
                        });
                    }).catch((error) => {
                        // cancel 或 fail 情况
                        vm.$emit('endRequest');
                    });
            },
            /**
             * 上传多张图片，需要保证一张上传完成之后，再上传另外一张
             */
            uploadWechatImages(localIds: string[]) {
                let vm = this;
                let localId = localIds.shift();
                return uploadWechatImage(localId, options.transformWXLocalImageData)
                    .then(({ image, serverId, base64 }) => {
                        vm.add({ image, serverId, base64 });
                        // 没有内容，不再上传
                        if (localIds.length == 0) {
                            return;
                        }
                        return vm.uploadWechatImages(localIds);
                    }).catch((errMsg) => {
                        throw new Error(errMsg)
                    });
            },
            transformImage(image) {
                return image.base64 ? image.base64 : image.image;
            },
        },
        mounted() {
            this.$on('click', function(index) {
                const images = this.images as WechatImage[];
                previewImage(images[index].image, images.map(image => image.image));
            });
        },
    })
}
