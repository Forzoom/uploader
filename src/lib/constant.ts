export const header = '<div class="ro-uploader-wrap" :class="containerClass" :style="containerStyle">';
export const footer = '<div v-for="(image, index) in images" '
+ ':key="index"'
+ 'class="ro-uploader-image-wrap"'
+ ':class="imageWrapClass"'
+ ':style="imageWrapStyle">'
+ '<div v-if="!lazyload" '
    + 'class="ro-uploader-image"'
    + ':class="imageClass"'
    + ':style="[{\'background-image\': \'url(\' + transformImage(image) + \')\'}, imageStyle]"'
    + '@click="onClickImage(index)">'
+ '</div>'
+ '<div v-else '
    + 'class="ro-uploader-image"'
    + ':class="imageClass"'
    + 'v-lazy:background-image="image"'
    + ':style="[imageStyle]"'
    + '@click="onClickImage(index)">'
+ '</div>'
+ '<div v-if="canModify" class="remove-wrapper" :class="removeClass" :style="removeStyle" @click="onClickRemove(index)"><div class="ro-uploader-remove"></div></div>'
+ '</div>'
+ '<slot name="request">'
+ '<div class="ro-uploader-image-wrap ro-uploader-request" '
    + 'v-if="images.length < size && canModify"'
    + '@click="onClickRequest"'
    + ':class="requestClass"'
    + ':style="requestStyle">'
+ '</div>'
+ '</slot>'
+ '</div>';