const isIOS = /iPhone/.test(navigator.userAgent);

declare global {
    interface Window {
        /**
         * 判定iOS设备上使用的webview内核， iOS微信6.5.3及其之后的版本 window.wxjs_is_wkwebview 为true时是使用WKWebview，为 false或者 “undefine”时是 UIWebview
         */
        __wxjs_is_wkwebview?: boolean;
    }
}

export function previewImage(image: string, images: string[]) {
    wx.previewImage({
        current: image,
        urls: images,
    });
}

/**
 * @return {Promise} res
 *  - localIds: string[]
 */
export function chooseImage(count: number) {
    return new Promise<{ localIds: string[] }>(function(resolve, reject) {
        wx.chooseImage({
            count,
            sizeType: ['compressed'],
            success: function(res) {
                return resolve(res);
            },
            // @ts-ignore
            cancel: function() {
                return reject(new Error('cancel'));
            },
            // @ts-ignore
            fail: function() {
                return reject(new Error('fail'));
            },
        });
    });
}

/**
 * 默认不显示progress
 * @param localId
 *
 * @return {Promise} res
 *  - serverId
 */
export function uploadImage(localId: string) {
    return new Promise<{ serverId: string }>(function(resolve, reject) {
        wx.uploadImage({
            localId,
            isShowProgressTips: 0,
            success: function(res) {
                resolve(res);
            },
            fail: function(error) {
                reject(error);
            },
        });
    });
}

/**
 * @param localId
 *
 * @return {Promise} imageData
 */
export function getLocalImgData(localId: string) {
    if (!isIOS || !window.__wxjs_is_wkwebview) {
        return localId;
    }
    return new Promise<string>(function(resolve, reject) {
        wx.getLocalImgData({
            localId,
            success(res) {
                return resolve(res.localData);
            },
        });
    });
}