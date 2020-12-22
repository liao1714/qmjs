import base from '@/utils/base'
import { Toast } from 'antd-mobile'
import { convertBase64UrlToFile } from '@/utils/methons'
/**
 * 采用递归的方式上传多个文件
 * filePaths 要上传的资源
 * results 上传成功返回的数据
 * successUp 成功个数
 * failUp 失败个数
 * index 上传文件的下标
 */
export function uploadOneByOne(filePaths = [], type, results = [], successUp = 0, failUp = 0, index = 0) {
  return new Promise((resolve) => {
    if (filePaths.length === 0) {
      resolve(results)
    } else {
      const formData = new FormData()
      formData.append('files', filePaths[index].file)
      window.g_app._store.dispatch({ type:'index/uploadImgThumbnail', payload: formData }).then(res => {
        console.log(res)
        if (res && res.code === 200) {
          results = results.concat(res.data[0].id)
          successUp++
          index++
          if (index >= filePaths.length) {
            console.log('上传成功' + successUp + ',' + '失败' + failUp)
            if (successUp === filePaths.length) {
              resolve(results)
            } else {
              console.log('上传失败···')
            }
          } else {
            uploadOneByOne(filePaths, type, results, successUp, failUp, index).then(res => {
              resolve(res)
            })
          }
        } else {
          failUp++
        }
      })
    }
  })
}


export function uploadFormOneByOne(filePaths = [], type, results = [], successUp = 0, failUp = 0, index = 0) {
  return new Promise((resolve) => {
    if (filePaths.length === 0) {
      resolve(results)
    } else {
      const formData = new FormData()
      formData.append('files', filePaths[index].file)
      window.g_app._store.dispatch({ type:'index/uploadImgThumbnail', payload: formData }).then(res => {
        console.log(res)
        if (res && res.code === 200) {
          results = results.concat(res.data[0])
          successUp++
          index++
          if (index >= filePaths.length) {
            console.log('上传成功' + successUp + ',' + '失败' + failUp)
            if (successUp === filePaths.length) {
              resolve(results)
            } else {
              console.log('上传失败···')
            }
          } else {
            uploadFormOneByOne(filePaths, type, results, successUp, failUp, index).then(res => {
              resolve(res)
            })
          }
        } else {
          failUp++
        }
      })
    }
  })
}



export function uploadWatermarkOneByOne(filePaths = [], associationId, type, results = [], successUp = 0, failUp = 0, index = 0) {
  return new Promise((resolve) => {
    if (filePaths.length === 0) {
      resolve(results)
    } else {
      
      const formData = new FormData()
      formData.append('file', filePaths[index].file)
      formData.append('id', associationId)

      window.g_app._store.dispatch({ type:'index/uploadWatermark', payload: formData }).then(res => {
        console.log(res)
        if (res && res.code === 200) {
          results = results.concat(res.data.id)
          successUp++
          index++
          if (index >= filePaths.length) {
            console.log('上传成功' + successUp + ',' + '失败' + failUp)
            if (successUp === filePaths.length) {
              resolve(results)
            } else {
              console.log('上传失败···')
            }
          } else {
            uploadWatermarkOneByOne(filePaths, associationId, type, results, successUp, failUp, index).then(res => {
              resolve(res)
            })
          }
        } else {
          failUp++
        }
      })
      
    }
  })
}

function uploadImages(filePaths = [], type, results = [], index = 0) {
  return new Promise((resolve, reject) => {
    if (filePaths.length === 0) {
      resolve(results)
    } else {
      uploadOneByOne(filePaths[index].files).then(res => {
        results = results.concat({
          key: filePaths[index].key,
          value: res
        })
        index++
        if (index >= filePaths.length) {
          resolve(results)
        } else {
          uploadImages(filePaths, type, results, index).then(res => {
            resolve(res)
          })
        }
      })
    }
  })
}

function uploadAvatarCropperImages(files) {
  return new Promise((resolve => {
    if (files.length === 0) {
      resolve([])
    } else {
      if (files[0].id) {
        resolve([files[0].id])
      } else {
        const formData = new FormData()
        console.log(files)
        formData.append('files', convertBase64UrlToFile(files[0].url))
        window.g_app._store.dispatch({ type:'index/uploadImgThumbnail', payload: formData }).then(res => {
          if (res && res.code === 200) {
            resolve([res.data[0].id])
          } else {
            Toast.hide()
          }
        })
      }
    }
  }))
}

module.exports = {
  uploadOneByOne: uploadOneByOne,
  uploadWatermarkOneByOne: uploadWatermarkOneByOne,
  uploadImages: uploadImages,
  uploadAvatarCropperImages: uploadAvatarCropperImages,
  uploadFormOneByOne: uploadFormOneByOne
}
