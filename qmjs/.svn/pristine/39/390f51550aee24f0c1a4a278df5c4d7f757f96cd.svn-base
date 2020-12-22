const base = {}
/**
 * @description: 图片添加水印
 * @param {file} file 图片的file对象
 * @param (associationName) 协会名称
 * @param (avatarUrl) 协会logo
 * @param {Function} callback 因为onload异步的问题 所以采用callback方式
 */
base.watermark = (file, associationName, avatarUrl, callback) => {
  if (!file || !file.name) return false
  let fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  let img = new Image()
  img.setAttribute('crossOrigin', 'anonymous')
  fileReader.onload = function () {
    img.src = fileReader.result
    img.onload = function() {
      // 创建canvas进行绘图
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      canvas.width  = img.width
      canvas.height = img.height

      // 首先绘制需要上传至服务器的图
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      let fontSize = canvas.width * 0.05
      // 设置文字阴影的颜色为黑色，透明度为60%
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)'
      // 将阴影向右移动2px，向上移动2px
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
      // 轻微模糊阴影
      ctx.shadowBlur = 2
      // 设置字号，字体
      ctx.font = fontSize + 'px 黑体'
      // 文本填充
      ctx.fillStyle = '#ffffff'
      // 将水印绘制上去，位置在右下角
      ctx.fillText(associationName, canvas.width - (fontSize * associationName.length)- canvas.width * 0.03, canvas.height - canvas.width * 0.03)
      const imgW = new Image()
      imgW.setAttribute('crossOrigin', 'anonymous')
      imgW.src = avatarUrl
      imgW.style.borderRadius = '50%'
      ctx.drawImage(imgW, canvas.width - (fontSize * associationName.length)- canvas.width * 0.03 - canvas.width * 0.08 - canvas.width * 0.015, canvas.height - canvas.width * 0.0875, canvas.width * 0.08, canvas.width * 0.08)

      // 转为base64格式
      let imgData = canvas.toDataURL(file.type)
      // 转为file对象传递出去
      callback(dataURLtoFile(imgData, file.name))
    }
  }
}

// 将base64转换为文件
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while(n--){
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type:mime})
}

export default base
