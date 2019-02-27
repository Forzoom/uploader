#### v0.0.2

1. export default Uploader 改为 export {Uploader, WechatUploader}

#### v0.0.3

1. add/remove添加boolean返回值

#### v0.0.4

1. WechatUploader中setImages(images: Array<image>)函数修改为setImages(data: Array<{image, serverId}>)
2. WechatUploader中getImages: Array<image>函数修改为getImages: Array<{image, serverId}>

#### 0.0.21

1. 删除add事件中的res，添加choose事件

#### 0.1.1

1. WechatUploader中数据存储定义修改

### Version

#### v0.0.1

1. @request() 请求一张图片
1. @click(index) 点击了某张图片
1. @remove(index) 删除了某张图片
1. add(image) 添加一张图片
1. remove(index) 删除某张图片
1. getImages(): Array<image> 获得所有的图片
1. setImages(images: Array<image>) 设置所有的图片
1. 样式上
	1. 强制70px宽度
	1. icon使用before和after生成

#### v0.0.2

1. 添加@add(image)事件
1. remove(index)函数调用将触发@remove(index)事件
1. 添加wechat-uploader.js
1. 图片上传将触发@load和@finish事件

#### 0.0.3

1. 样式代码简单优化
1. remove(index)需要对index进行处理，例如是否大于0。添加返回值
1. add(image)需要判断当前的size是否已满。添加返回值

#### 0.0.4

1. 修复WechatUploader中setImages/getImages的参数可能导致的不正确问题

#### 0.0.5

1. WechatUploader提供preview
1. 添加canModify控制部分按钮的显示

#### 0.0.6

1. 修复WechatUploader的setImages逻辑错误

#### 0.0.7

1. request组件和container组件的样式允许部分自定义

#### 0.0.8

1. 修复错误

#### 0.0.9

1. 添加 removeAll / getCount / getSize 函数

#### 0.0.10

1. 添加新函数，优化样式

#### 0.0.11

1. 优化样式

#### 0.0.12

1. 添加props: imageStyle/imageClass

#### 0.0.13

1. 完善文档

#### v0.0.14

1. 修复错误

#### v0.0.15

1. 添加props，mageWrapClass和imageWrapStyle

#### v0.0.16

1. 添加prop: lazyload

#### v0.0.17

1. 修复微信预览黑屏的问题

#### v0.0.18

1. 修复preview的错误

#### 0.0.20

1. add事件添加参数res，变成add(image, serverId, res)

#### 0.0.21

1. 回滚0.0.20功能，添加choose(sourceType)事件

#### 0.1.1

1. 修改WechatUploader中数据存储类型，添加类型定义

#### 0.1.4

1. 添加InputUploader组件

#### 0.1.5

1. (break)修改remove按钮的html结构