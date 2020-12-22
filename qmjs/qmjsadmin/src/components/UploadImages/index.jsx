import React, { useState } from 'react'
import { message, Upload, Spin, Modal } from 'antd'
import ImgCrop from 'antd-img-crop'
import 'antd/es/modal/style'
import 'antd/es/slider/style'
import { uploadImg, uploadImgThumbnail } from '@/services'

const UploadImages = (props) => {
  const getDefault = () => {
    let arr = []
    props.fileList.map((item) => {
      arr.push({
        uid: item.id,
        id: item.id,
        name: 'image.png',
        status: 'done',
        url: item.thumbnail,
        originalImage: item.originalImage,
        thumbnail: item.thumbnail,
      })
    })
    return arr
  }
  let [fileList, setFileList] = useState(getDefault)
  const [spinning, setSpinning] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const getBase64 = (img) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result))
      reader.readAsDataURL(img)
    })
  }
  const customRequest = (v) => {
    console.log(v)
    if (v.file.size > 4*1024*1024) {
      message.warning('图片不得大于4M', 2)
    } else {
      const formData = new FormData()
      formData.append('files', v.file)
      setSpinning(true)
      uploadImgThumbnail(formData).then((res) => {
        console.log(res)
        if (res.code === 200) {
          getBase64(v.file).then((item) => {
            let arr = [...fileList]
            arr.push({
              uid: res.data[0].id,
              id: res.data[0].id,
              name: 'image.png',
              status: 'done',
              url: item,
              originalImage: res.data[0].originalImage,
              thumbnail: res.data[0].thumbnail,
            })
            setFileList(arr)
            props.getImageList(arr)
            message.success('上传成功！')
          })
        } else {
          message.error('上传失败！')
        }
        setSpinning(false)
      })
        .catch((err) => {
          console.log(err)
          setSpinning(false)
        })
    }
  }
  const onRemove = (file) => {
    console.log(file)
    console.log(fileList)
    fileList = fileList.filter((item) => item.uid !== file.uid)
    setFileList(fileList)
    props.getImageList(fileList)
  }
  const onDownload = (file) => {
    console.log(file)
    let tempa = document.createElement('a')
    tempa.href = file.originalImage
    tempa.download = 'download'
    document.body.append(tempa)
    tempa.click()
    tempa.remove()
  }
  const onPreview = async (file) => {
    setPreviewImage(file.originalImage)
    setShowModal(true)
  }
  return (
    <Spin tip="上传中..." spinning={spinning}>
      <ImgCrop rotate aspect={props.aspect || 1} modalWidth={800} shape={'rect'}>
        <Upload
          name={'file'}
          listType="picture-card"
          fileList={fileList}
          customRequest={customRequest}
          onPreview={onPreview}
          onRemove={onRemove}
          onDownload={onDownload}
          disabled={props.disabled}
          multiple={props.multiple || false}
          showUploadList={{
            showDownloadIcon: true,
            showRemoveIcon: true,
          }}
        >
          {fileList.length < 1 && '+ 上传'}
        </Upload>
      </ImgCrop>
      <Modal
        className="image-preview"
        title="图片预览"
        centered
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={[]}
      >
        <img src={previewImage} alt="" />
      </Modal>
    </Spin>
  )
}
export default UploadImages
