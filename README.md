### Install

npm install @forzoom/uploader

### Usage

#### WechatUploader

![Example](assets/img1.png)

大致上存在四种元素，分别是“容器”，“图片元素”，“添加按钮”，“图片容器”
嵌套结构为

    1. “容器”
	    2. “图片容器”
		    3. “图片元素”
		    3. 其他元素
	    2. “添加按钮”

上图中，“咖啡”图片实际上有一个“图片容器”和一个“图片元素”组成
第三个是一个“添加按钮”
点击添加按钮能够调用JSSDK中的图片上传逻辑

__根据需要，可以使用Props中的样式内容修改不同元素的样式__

##### Props

|名称|默认|说明|
|---|---|---|
|size|1|允许最大上传图片数量|
|canModify|true|是否允许修改|
|containerClass|\{\}|“容器”元素样式类|
|containerStyle|\{\}|“容器”元素样式|
|imageClass|\{\}|每个“图片元素”样式类|
|imageStyle|\{\}|每个“图片元素”样式|
|requestClass|\{\}|“添加按钮”样式类|
|requestStyle|\{\}|“添加按钮”样式|
|imageWrapClass|\{\}|“图片容器”样式类|
|imageWrapStyle|\{\}|“图片容器”样式|
|useWechatPreview|true|是否使用微信JSSDK预览|
|lazyload|false|是否使用vue-lazyload|

##### 自定义事件

|名称|参数|说明|
|---|---|---|
|load|无|图片上传到微信服务器开始|
|finish|无|图片上传到微信服务器结束|
|add| \{ localId, serverId, \} |有图片增加|
|remove|index (被删除图片位置)|有图片被删除|
|click|index (被点击图片位置)|当正在显示的图片被点击|
|choose|sourceType|图片来源|

##### 函数

|名称|参数|说明|
|---|---|---|
|request|无|发起图片上传|
|removeAll|无|删除所有图片|
|setImages|无|设置默认显示的图片|
|getImages|无|获得所有图片|

##### 示例

###### WechatUploader.setImages

设置uploader中默认的图片内容（注意，如果uploader被销毁的情况下，设置的内容自然也会消失）

__html__

```html
	<!-- size="4": 显示多少个图片 -->
	<!-- can-modify="false": 不允许修改，只允许查看 -->
	<WechatUploader
		ref="uploader"
		:size="4"
		:can-modify="true">
	</WechatUploader>
```

__script__

```javascript
	this.$refs.uploader.setImages([
		{
			image: '...', // 可以是url或者localId
			serverId: '...', // 可以不传入
		},
	]);
```

###### WechatUploader.getImages

获得uploader中当前的图片内容

```javascript
	const images = this.$refs.uploader.getImages();

	// 结果是
	[
		{
			image: '...',
			serverId: '...',
		},
	]
```

### Roadmap

1. image之间添加间距

### Changelog

#### v0.0.2

1. export default Uploader 改为 export {Uploader, WechatUploader}

#### v0.0.3

1. add/remove添加boolean返回值

#### v0.0.4

1. WechatUploader中setImages(images: Array<image>)函数修改为setImages(data: Array<{image, serverId}>)
2. WechatUploader中getImages: Array<image>函数修改为getImages: Array<{image, serverId}>

#### 0.0.21

1. 删除add事件中的res，添加choose事件

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