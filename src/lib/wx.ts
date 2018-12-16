const isIOS = /iPhone/.test(navigator.userAgent);

export function previewImage(image, images) {
    wx.previewImage({
        current: image,
        urls: images,
    });
}

/**
 * @return {Promise} res
 *  - localIds: Array<string>
 */
export function chooseImage(count) {
    return new Promise(function(resolve, reject) {
        wx.chooseImage({
            count,
            sizeType: ['compressed'],
            success: function(res) {
                return resolve(res);
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
export function uploadImage(localId) {
    return new Promise(function(resolve, reject) {
        wx.uploadImage({
            localId,
            isShowProgressTips: 0,
            success: function(res) {
                return resolve(res);
            },
        });
    });
}

/**
 * @param localId
 *
 * @return {Promise} imageData
 */
export function getLocalImgData(localId) {
    if (!isIOS || !window.__wxjs_is_wkwebview) {
        return localId;
    }
    return new Promise(function(resolve, reject) {
        wx.getLocalImgData({
            localId,
            success(res) {
                return resolve(res.localData);
            },
        });
    });
}