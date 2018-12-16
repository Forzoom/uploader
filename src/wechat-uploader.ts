import {
    previewImage,
    chooseImage,
    uploadImage,
    getLocalImgData,
} from './lib/wx.js';
import Uploader from './uploader.vue';

/**
 *
 *
 * @return {Promise} {image, serverId}
 */
function uploadWechatImage(localId) {
    let serverId = null;
    return uploadImage(localId).then((_res) => {
        serverId = _res.serverId; // 记录res
        return localId;
    })
    .then(getLocalImgData) // 权限检测可能不应该这样使用
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
export default {
    name: 'WechatUploader',
    extends: Uploader,
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
            const vm = this;
            return chooseImage(vm.size - vm.images.length)
                .then((res) => {
                    const localIds = res.localIds;
                    if (localIds.length > 0) {
                        vm.$emit('choose', res);
                        vm.$emit('load');
                        return vm.uploadWechatImages(localIds).then(function() {
                            vm.$emit('finish');
                        });
                    }
                })
        },
        /**
         * 上传多张图片，需要保证一张上传完成之后，再上传另外一张
         */
        uploadWechatImages(localIds) {
            const vm = this;
            const localId = localIds.shift();
            return uploadWechatImage(localId)
            .then(function({ image, serverId, res, }) {
                vm.add({image, serverId});
                if (localIds.length > 0) {
                    return vm.uploadWechatImages(localIds);
                }
            });
        },
    },
    mounted() {
        this.$on('click', function(index) {
            previewImage(this.images[index].image, this.images.map(image => image.image));
        });
    },
};