import UploaderFactory from './uploader';
import WechatUploaderFactory from './wechat-uploader';
import InputUploaderFactory from './input-uploader';
import Vue from 'vue';
import { UploaderOptions } from 'types';

let installed: boolean = false;

function install(vue: typeof Vue, options: UploaderOptions) {
	if (installed) {
		return;
	}
	installed = true;

	vue.component('Uploader', UploaderFactory(vue));
	vue.component('WechatUploader', WechatUploaderFactory(vue, options));
	vue.component('InputUploader', InputUploaderFactory(vue, options));
}

export default install;
