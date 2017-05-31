### Roadmap

1. 使用before和after生成的icon代码量优化
1. image之间添加间距
1. remove(index)需要对index进行处理，例如是否大于0
1. add(image)需要判断当前的size是否已满
1. 添加直接上传的功能，目前兼容微信jssdk图片上传
1. 提供load/finish/success事件

### Changelog

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