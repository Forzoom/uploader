<template>
    <div class="ro-uploader-wrap">
        <div v-for="(image, index) in images" class="ro-uploader-image-wrap">
            <img class="ro-uploader-image" :src="url" @click="onClickImage(index)" />
            <i class="icon" @click="onClickRemove(index)">&#xe602;</i>
        </div>
        <div
            class="ro-uploader-image-wrap ro-uploader-add"
            v-show="images.length < size"
            @click="onClickAddButton">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ROUploader',
        props: {
            size: {
                type: Number,
                default: 1,
            },
        },
        data() {
            return {
                // 包含所有图片的数组
                images: [],
            };
        },
        methods: {
            /**
             * 当点击图片时触发
             */
            onClickImage() {

            },
            /**
             * 当点击删除按钮时触发
             */
            onClickRemove() {

            },
        },
    };
</script>

<style lang="less">

    @border-color: #bbbbbb;
    @active-border-color: darken(@border-color, 20%);
    @size: 70px;
    @border-width: 1px;

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
            }
            .icon {
                position: absolute;
                width: 11px;
                height: 11px;
                font-size: 11px;
                line-height: 11px;
                color: #ffffff;
                background-color: #aaaaaa;
                top: 0rem;
                right: 0rem;
            }
        }
        .ro-uploader-add {
            position: relative;
            width: @size;
            height: @size;
            border: 1px solid  #eee;
            &:before,
            &:after {
                content: " ";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
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
    }   
</style>