import Vue from 'vue';
import {
    UploaderData,
    UploaderOptions,
} from '../types/index';
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
                if ($input) {
                    $input.click();
                }
            },
        },
        template: '<Uploader><div slot="extra">'
            + '<input ref="fileInput" class="input" type="file" />'
            + '</div><Uploader>',
    })
}
