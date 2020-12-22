import React, { Component } from 'react'
import 'cropperjs/dist/cropper.css'
import './index.less'
import WxImageViewer from 'react-wx-images-viewer'
import Router from '@/utils/router'
class PreviewImage extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    window.onpopstate = () => {
      this.props.hidePreviewImage()
    }
    history.pushState({page: 1}, '图片预览', '?preview_image=1' + '&' + window.location.href.split('?')[1])
  }
  hidePreviewImage =()=> {
    this.props.hidePreviewImage()
    Router.go(-1)
  }


  render() {
    return (
      <div className='preview-image'>
        <WxImageViewer
          onClose={()=>this.hidePreviewImage()}
          urls={this.props.previewImageList}
          index={this.props.previewImageIndex}
        />
      </div>
    )
  }
}
export default PreviewImage
