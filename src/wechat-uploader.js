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
            /**
             * 保存所有的serverId
             */
            serverIds: [],
        };
    },
    methods: {
        /**
         * @param {Array<{image, serverId}>} data
         */
        setImages(data) {
            const images = [];
            const serverIds = [];
            for (let i = 0, len = data.length; i < len; i++) {
                images.push(data[i].image);
                serverIds.push(data[i].serverId);
            }
            this.images = images;
            this.serverIds = serverIds;
        },
        /**
         * 添加图片
         *
         * @param {} image 图片内容
         * @param {} serverId 
         */
        add(image, serverId) {
            if (this.images.length < this.size) {
                this.images.push(image);
                this.serverIds.push(serverId);
                this.$emit('add', {
                    image,
                    serverId,
                });
                return true;
            }
            return false;
        },
        /**
         * 获得所有的图片内容
         *
         * @return {Array<{image, serverId}>} 
         */
        getImages() {
            const result = [];
            for (let i = 0, len = this.images.length; i < len; i++) {
                result.push({
                    image: this.images[i],
                    serverId: this.serverIds[i],
                });
            }
            return result;
        },
        /**
         * 删除图片
         *
         * @param {} index
         */
        remove(index) {
            if (0 <= index && index < this.size) {
                this.images.splice(index, 1);
                this.serverIds.splice(index, 1);
                this.$emit('remove', index);
                return true;
            }
            return false;
        },
        /**
         * 要求添加新的图片
         */
        onClickRequest() {
            const vm = this;
            return chooseImage(vm.size - vm.images.length)
                .then((localIds) => {
                    if (localIds.length > 0) {
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
            return uploadImage(localId)
            .then(function(serverId) {
                vm.add(localId, serverId);
                if (localIds.length > 0) {
                    return vm.uploadWechatImages(localIds);
                }
            });
        },
    },
    mounted() {
        this.$on('click', function(image) {
            previewImage(image, this.images);
        });
    },
};