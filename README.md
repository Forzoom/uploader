### Roadmap

1. image之间添加间距
1. 提供success事件

### Changelog

#### v0.0.2

1. export default Uploader 改为 export {Uploader, WechatUploader}

#### v0.0.3

1. add/remove添加boolean返回值

#### v0.0.4

1. WechatUploader中setImages(images: Array<image>)函数修改为setImages(data: Array<{image, serverId}>)
2. WechatUploader中getImages: Array<image>函数修改为getImages: Array<{image, serverId}>

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

#### v0.0.3

1. 样式代码简单优化
1. remove(index)需要对index进行处理，例如是否大于0。添加返回值
1. add(image)需要判断当前的size是否已满。添加返回值

#### v0.0.4

1. 修复WechatUploader中setImages/getImages的参数可能导致的不正确问题

#### v0.0.5

1. WechatUploader提供preview
1. 添加canModify控制部分按钮的显示
