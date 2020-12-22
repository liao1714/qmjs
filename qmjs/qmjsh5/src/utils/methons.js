import wx from 'weixin-js-sdk'
export function convertDate(timestamp) {
  // 当前时间
  let nowDate = new Date()
  // 秒 xx秒
  let nowSeconds = nowDate.getSeconds()
  // 分 xx分
  let nowMinutes = nowDate.getMinutes()
  // 时 xx时
  let nowHours = nowDate.getHours()
  // 日
  let nowDays = nowDate.getDate()
  // 月 getMonth()取得月份是从0开始的，所以要+1
  let nowMonths = nowDate.getMonth() + 1
  // 年
  let nowYears = nowDate.getFullYear()
  // 需要转化的时间对象
  let formatDate = new Date(timestamp)
  let seconds = formatDate.getSeconds()
  let minutes = formatDate.getMinutes()
  let minutesShow = ('0' + formatDate.getMinutes()).substr(-2)
  let hours = formatDate.getHours()
  let hoursShow = ('0' + formatDate.getHours()).substr(-2)
  let days = formatDate.getDate()
  let months = formatDate.getMonth() + 1
  let years = formatDate.getFullYear()
  // 进行比较
  if (years <= nowYears) {
    //今年的数据
    if (years === nowYears) {
      // 比较月份
      if (months === nowMonths) {
        // 比较日
        if (days === nowDays) {
          // 一天以内
          // 比较小时
          if (nowHours === hours) {
            // 一小时内
            if (minutes === nowMinutes) {
              return (nowSeconds - seconds + 3) + '秒前'
            } else if (minutes < nowMinutes) {
              return (nowMinutes - minutes) + '分钟前'
            } else {
              return false
            }
          } else if (hours < nowHours) {
            //一个小时以内
            if (((nowHours - hours) * 60 - minutes + nowMinutes) < 60) {
              return (nowHours - hours) * 60 - minutes + nowMinutes + '分钟前'
            } else {
              return hoursShow + ':' + minutesShow
            }
          } else {
            // 走到这里逻辑上也是不通的，可做其他处理
            return false
          }
        } else if (days < nowDays) {
          // 昨天的数据
          if ((nowDays - days) === 1) {
            return '昨天' + hoursShow + ':' + minutesShow
          } else {
            return months + '月' + days + '日'
          }
        } else {
          // 走到这里逻辑上也是不通的，可做其他处理
          return false
        }
      } else if (months < nowMonths) {
        // 5月6日
        return months + '月' + days + '日'
      } else {
        // 走到这里逻辑上也是不通的，可做其他处理
        return false
      }
    } else {
      // 不是今年的，直接返回 xxxx年xx月xx日
      return years + '年' + months + '月' + days + '日'
    }
  } else {
    // 逻辑上该时间对象为今年以后的，逻辑走不通，该数据有问题，可做其他处理
    return false
  }
}

// 时间转换 2019-07-24 00:00:00
export function formatDate(date, format) {
  date = new Date(parseInt(date))
  const dict = {
    'yyyy': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'H': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds(),
    'MM': ('' + (date.getMonth() + 101)).substr(1),
    'dd': ('' + (date.getDate() + 100)).substr(1),
    'HH': ('' + (date.getHours() + 100)).substr(1),
    'mm': ('' + (date.getMinutes() + 100)).substr(1),
    'ss': ('' + (date.getSeconds() + 100)).substr(1)
  }
  return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]]
  })
}

export function getUrlParam(paraName, url) {
  let arrObj = url.split('?')
  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split('&')
    let arr
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] === paraName) {
        return arr[1]
      }
    }
    return ''
  }
  else {
    return ''
  }
}

export function convertBase64UrlToFile(base64) {
  const bytes = window.atob(base64.split(',')[1])
  const ab = new ArrayBuffer(bytes.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: 'image/png' })
}

function getBase64Image(img) {
  let canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  return canvas.toDataURL('image/' + ext)
}

export function convertUrlToBase64Url(url) {
  return new Promise(resolve => {
    let image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = url
    image.onload = function () {
      resolve(getBase64Image(image))
    }
  })
}

export function urlTobase64(url, maxsize){
  return new Promise((resolve,reject) =>{
    wx.getLocalImgData({
      localId: url,//图片的本地ID
      success: function (res) {
        var localData = res.localData
        if (localData.indexOf('data:image') != 0) {                       
          //判断是否有这样的头部                                               
          localData = 'data:image/png;base64,' +  localData                    
        }                    
        localData = localData.replace(/\r|\n/g, '').replace('data:image/png', 'data:image/png') // 此处的localData 就是你所需要的base64位  
        localData = convertBase64UrlToFile(localData)  
        console.log('maxsize' + maxsize)
        console.log('localData')
        console.log(localData)
        compressImages(localData, maxsize).then(res => {
          console.log('res------')
          console.log(res)
          resolve(res)  
        })
      }    
    })
  })
}

//一个个转换微信图片
export function changeWxImagesOneByOne(filePaths = [], maxSize, results = [], successUp = 0, index = 0) {
  return new Promise((resolve) => {
    if (filePaths.length === 0) {
      resolve(results)
    } else {
      urlTobase64(filePaths[index], maxSize).then(res => {
        results = results.concat(res)
        successUp++
        index++
        if (index >= filePaths.length) {
          console.log('转换成功' + successUp)
          if (successUp === filePaths.length) {
            resolve(results)
          } else {
            console.log('转换失败···')
          }
        } else {
          changeWxImagesOneByOne(filePaths, maxSize, results, successUp, index).then(res => {
            resolve(res)
          })
        }
      })
    }
  })
}



export function checkImagesSize(files) {
  for (let i = 0; i < files.length; i++) {
    let file = files[i].file
    // if(file.name.indexOf(",") !==-1 ||  file.name.indexOf("，") !==-1) {
    //   alert('图片名不能含有逗号');
    //   return;
    // }
    let imageDataReader = new FileReader()
    imageDataReader.readAsDataURL(file)
    imageDataReader.onload = function () {
      let size = file.size
      let name = file.name
      let imgSrc = this.result
      if (size > 1024 * 1024 * 4) {
        var img = new Image()
        img.src = imgSrc
        img.onload = function () {
          var these = this
          // 默认按比例压缩
          var w = these.width * 0.5,
            h = these.height * 0.5
          //生成canvas
          var canvas = document.createElement('canvas')
          var ctx = canvas.getContext('2d')
          // 创建属性节点
          var anw = document.createAttribute('width')
          anw.nodeValue = w
          var anh = document.createAttribute('height')
          anh.nodeValue = h
          canvas.setAttributeNode(anw)
          canvas.setAttributeNode(anh)
          // 压缩图片
          ctx.drawImage(these, 0, 0, w, h)
          // quality 默认图片质量为0.7, quality值越小，所绘制出的图像越模糊
          // toDataURL将画布转化为base64格式信息图像
          var base64 = canvas.toDataURL('image/png', 0.7)
          imgSrc = base64
          var strLength = base64.length
          var fileLength = parseInt(strLength - (strLength / 8) * 2)
          // 由字节转换为KB
          size = (fileLength / 1024 / 1024).toFixed(2)
          files[i].file = dataURLtoFile(imgSrc, name)
        }
      }
    }
  }
}

// 将base64转换为文件
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export function circlePortrait(imgUrl) {
  return new Promise((resolve, reject) => {
    let imgObj = new Image()
    imgObj.src = imgUrl
    imgObj.onload = function () {
      let radius, diameter, canvas, context
      radius = imgObj.width * 0.5
      diameter = radius * 2
      canvas = document.createElement('canvas')
      if (!canvas.getContext) {
        console.log('您的浏览器版本过低，暂不支持。')
        reject()
      }
      canvas.width = diameter
      canvas.height = diameter
      context = canvas.getContext('2d')
      context.clearRect(0, 0, diameter, diameter)
      context.save()
      context.beginPath()
      context.arc(radius, radius, radius, 0, Math.PI * 2, false)
      context.clip()
      context.drawImage(imgObj, 0, 0, diameter, diameter, 0, 0, diameter, diameter)
      context.restore()
      resolve(canvas.toDataURL('image/png'))
    }
  })
}

//压缩图片
export function compressImagesOneByOne(filePaths = [], maxSize, results = [], successUp = 0, index = 0) {
  return new Promise((resolve) => {
    if (filePaths.length === 0) {
      resolve(results)
    } else {
      compressImages(filePaths[index].file, maxSize).then(res => {
        results = results.concat(res)
        successUp++
        index++
        if (index >= filePaths.length) {
          console.log('压缩成功' + successUp)
          if (successUp === filePaths.length) {
            resolve(results)
          } else {
            console.log('压缩失败···')
          }
        } else {
          compressImagesOneByOne(filePaths, maxSize, results, successUp, index).then(res => {
            resolve(res)
          })
        }
      })
    }
  })
}

export function compressImages(file, maxSize) {
  return new Promise((resolve) => {
    let imageDataReader = new FileReader()
    imageDataReader.readAsDataURL(file)
    imageDataReader.onload = function () {
      let size = file.size
      let name = file.name
      let imgSrc = this.result
      if (size > 1024 * 1024 * maxSize) {
        let img = new Image()
        img.src = imgSrc
        img.onload = function () {
          let that = this
          let w = that.width * 0.5, h = that.height * 0.5
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          let anw = document.createAttribute('width')
          anw.nodeValue = w
          let anh = document.createAttribute('height')
          anh.nodeValue = h
          canvas.setAttributeNode(anw)
          canvas.setAttributeNode(anh)
          ctx.drawImage(that, 0, 0, w, h)
          let base64 = canvas.toDataURL('image/png', 0.5)
          imgSrc = base64
          let strLength = base64.length
          let fileLength = parseInt((strLength - (strLength / 8) * 2).toString()) / (1024 * 1024)
          if (fileLength > maxSize) {
            compressImages(dataURLtoFile(imgSrc, name), maxSize).then(res => {
              resolve(res)
            })
          } else {
            resolve({
              file: dataURLtoFile(imgSrc, name),
              url: imgSrc
            })
          }
        }
      } else {
        resolve({
          file: file,
          url: imgSrc
        })
      }
    }
  })
}
