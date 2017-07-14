<template>
    <div class="ro-uploader-wrap" :class="containerClass" :style="containerStyle">
        <div
            v-for="(image, index) in images"
            class="ro-uploader-image-wrap">
            <div
                class="ro-uploader-image"
                :style="{'background-image': 'url(' + image + ')'}"
                @click="onClickImage(index)"
                v-pressure-press="onPress(index)">
            </div>
            <div v-if="canModify" class="ro-uploader-remove" @click="onClickRemove(index)"></div>
        </div>
        <div
            class="ro-uploader-image-wrap ro-uploader-request"
            v-if="images.length < size && canModify"
            @click="onClickRequest"
            :class="requestClass"
            :style="requestStyle">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ROUploader',
        props: {
            /**
             * 允许上传图片个数
             */
            size: {
                type: Number,
                default: 1,
            },
            /**
             * 是否允许修改
             */
            canModify: {
                type: Boolean,
                default: true,
            },
            containerClass: {
                type: [ Object, Array, ],
                default() {
                    return {};
                },
            },
            /**
             * 容器样式
             */
            containerStyle: {
                type: Object,
                default() {
                    return {};
                },
            },
            requestClass: {
                type: [ Object, Array, ],
                default() {
                    return {};
                },
            },
            /**
             * 请求对象的样式
             */
            requestStyle: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        data() {
            return {
                // 包含所有图片的数组
                images: [],
            };
        },
        methods: {
            // 重置所有的images列表
            setImages(images) {
                const tmp = [];
                for (let i = 0, len = images.length; i < len; i++) {
                    tmp.push(images[i]);
                }
                this.images = tmp;
            },
            /**
             * 添加图片
             *
             * @param {string} image
             */
            add(image) {
                if (this.images.length < this.size) {
                    this.images.push(image);
                    this.$emit('add', image);
                    return true;
                }
                return false;
            },
            /**
             * 删除图片
             *
             * @param {number} index
             */
            remove(index) {
                if (0 <= index && index < this.size) {
                    this.images.splice(index, 1);
                    this.$emit('remove', index);
                    return true;
                }
                return false;
            },
            /**
             * 获得所有图片
             *
             * @return {Array<string>}
             */
            getImages() {
                return this.images.slice(0);
            },
            /**
             * 当点击图片时触发
             *
             * @param {number} index
             */
            onClickImage(index) {
                this.$emit('click', index);
            },
            /**
             * 当点击删除按钮时触发
             */
            onClickRemove(index) {
                this.remove(index);
            },
            /**
             * 当点击添加按钮时
             */
            onClickRequest() {
                this.$emit('request');
            },
            /**
             * 当点击
             */
            onPress(index) {
                return () => {
                    this.$emit('menu', index);
                }
            },
        },
    };
</script>

<style lang="less">

    @color-white: #ffffff;

    @border-color: #bbbbbb;
    @active-border-color: darken(@border-color, 20%);
    @size: 70px;
    @border-width: 1px;

    @remove-button-size: 18px;

    .ro-uploader-wrap {
        display: flex;
        background-color: #ffffff;
        text-decoration: none;
        .ro-uploader-image-wrap {
            position: relative;
            .ro-uploader-image {
                vertical-align: middle;
                width: @size;
                height: @size;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
            }
            .ro-uploader-remove {
                position: absolute;
                width: @remove-button-size;
                height: @remove-button-size;
                font-size: @remove-button-size;
                line-height: @remove-button-size;
                color: #ffffff;
                background-color: #aaaaaa;
                top: 0rem;
                right: 0rem;
                &:before,
                &:after {
                    background-color: @color-white;
                    transform: translate(-50%, -50%) rotateZ(45deg);
                }
                &:before {
                    width: @border-width + 1;
                    height: @remove-button-size;
                }
                &:after {
                    width: @remove-button-size;
                    height: @border-width + 1;
                }
                &:active {
                    border-color: @color-white;
                    &:before,
                    &:after {
                        background-color: @color-white;
                    }
                }
            }
        }
        .ro-uploader-request {
            position: relative;
            width: @size;
            height: @size;
            border: @border-width solid #aaaaaa;
            &:before,
            &:after {
                background-color: @border-color;
            }
            &:before {
                width: @border-width + 1;
                height: @size / 2;
            }
            &:after {
                width: @size / 2;
                height: @border-width + 1;
            }
            &:active {
                border-color: @active-border-color;
                &:before,
                &:after {
                    background-color: @active-border-color;
                }
            }
        }
        .ro-uploader-remove,
        .ro-uploader-request {
            &:before,
            &:after {
                content: " ";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>