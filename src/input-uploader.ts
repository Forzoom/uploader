import Vue from 'vue';
import {
    UploaderData,
    UploaderOptions,
    FileImage,
} from '../types/index';
import {
    header,
    footer,
} from './lib/constant';
import UploaderFactory from './uploader';

/**
 * 
 */
export default function factory(_Vue: typeof Vue, options: UploaderOptions) {
    const Uploader = UploaderFactory(_Vue);
    return Uploader.extend<UploaderData<FileImage>, {}, {}, {}>({
        name: 'InputUploader',
        props: {
            accept: {
                type: String,
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
                const $input = this.$refs.fileInput;
                if ($input) {
                    $input.click();
                }
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
                    const removed = this.images.splice(index, 1);
                    for (let i = 0, len = removed.length; i < len; i++) {
                        URL.revokeObjectURL(removed[i].objectUrl);
                    }
                    this.$emit('remove', index);
                    return true;
                }
                return false;
            },
            onChangeInput() {
                const $input = this.$refs.fileInput as HTMLInputElement;
                if ($input) {
                    for (let i = 0, len = $input.files.length; i < len; i++) {
                        // 如果此次循环已满，则不再循环
                        if (this.images.length >= this.size) {
                            return;
                        }
                        this.add({
                            url: URL.createObjectURL($input.files[i]),
                            file: $input.files[i],
                            objectUrl: URL.createObjectURL($input.files[i]),
                        });
                    }
                }
            },
            /**
             * 获取用于展示的image
             */
            transformImage(image: FileImage) {
                return image.objectUrl || image.url;
            },
        },
        template: header
            + '<input ref="fileInput" class="ro-uploader-input" type="file" @change="onChangeInput" :multiple="(size - images.length) > 1" :accept="accept" />'
            + footer,
    })
}
