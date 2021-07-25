import Vue from 'vue';
import {
    previewImage,
    chooseImage,
    uploadImage,
    getLocalImgData,
} from './lib/wx';
import {
    UploaderData,
    ImageInfo,
    UploaderOptions,
} from '../types/index';
import UploaderFactory from './uploader';

/**
 * 上传图片到微信
 */
function uploadWechatImage(localId: string, transformLocalImageData: boolean): Promise<ImageInfo> {
    return uploadImage(localId)
        .then((res) => {
            return new Promise<ImageInfo>((resolve) => {
                getLocalImgData(localId).then((image) => {
                    resolve({
                        localId,
                        serverId: res.serverId,
                        image,
                        mode: 'wechat',
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
    return Uploader.extend<UploaderData<ImageInfo>, {}, {}, {}>({
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
                    .then((image) => {
                        vm.add(image);
                        // 没有内容，不再上传
                        if (localIds.length == 0) {
                            return;
                        }
                        return vm.uploadWechatImages(localIds);
                    }).catch((errMsg) => {
                        throw new Error(errMsg)
                    });
            },
            transformImage(image: ImageInfo) {
                return image.url;
            },
        },
        mounted() {
            this.$on('click', function(index: number) {
                const images = this.images as ImageInfo[];
                previewImage(images[index].url, images.map(image => image.url));
            });
        },
    })
}
