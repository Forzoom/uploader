import {
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
    return uploadImage(localId).then((_serverId) => {
        serverId = _serverId; // 记录serverId
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
    data() {
        return {
            serverIds: [],
        };
    },
    methods: {
        /**
         * 添加图片
         *
         * @param {} image 图片内容
         * @param {} serverId 
         */
        add(image, serverId) {
            this.images.push(image);
            this.serverIds.push(serverId);
            this.$emit('add', {
                image,
                serverId,
            });
        },
        /**
         * 删除图片
         *
         * @param {} index
         */
        remove(index) {
            this.images.splice(index, 1);
            this.serverIds.splice(index, 1);
            this.$emit('remove', index);
        },
        /**
         * 要求添加新的图片
         */
        onClickRequest() {
            const vm = this;
            return chooseImage(this.size - this.images.length)
                .then((localIds) => {
                    vm.$emit('load');
                    return uploadWechatImages(localId).then(function() {
                        vm.$emit('finish');
                    });
                })
        },
        /**
         * 上传多张图片，需要保证一张上传完成之后，再上传另外一张
         */
        uploadWechatImages(localIds) {
            const vm = this;
            const localId = localIds.unshift();
            uploadWechatImage(localId)
            .then(function({ image, serverId, }) {
                vm.add(image, serverId);
                if (localIds.length > 0) {
                    return uploadWechatImages(localIds);
                }
            });
        },
    },
};