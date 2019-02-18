import Vue from 'vue';
import {
    UploaderData,
    UploaderOptions,
} from '../types/index';
import {
    header,
    footer,
} from './lib/constant';
import UploaderFactory from './uploader';

function noop<T>(_: T) {
    return _;
}

/**
 * 
 */
export default function factory(_Vue: typeof Vue, options: UploaderOptions) {
    const Uploader = UploaderFactory(_Vue);
    return Uploader.extend<UploaderData<File>, {}, {}, {}>({
        name: 'InputUploader',
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
    })
}
