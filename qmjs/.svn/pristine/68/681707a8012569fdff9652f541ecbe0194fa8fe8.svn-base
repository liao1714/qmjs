import React, { Component } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './index.less'
import { circlePortrait } from '@/utils/methons'
import { Toast } from 'antd-mobile'
class CropperImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      DataURL: ''
    }
  }
  componentDidMount() {
    window.onpopstate = () => {
      this.props.hideCropperImage()
    }
    history.pushState({page: 1}, '裁剪图片', '?image_cropper=1' + '&' + window.location.href.split('?')[1])
  }
  crop() {
    circlePortrait(this.cropper.getCroppedCanvas().toDataURL()).then(res => {
      this.setState({
        DataURL: res
      })
    })
  }
  onInitialized(cropper) {
    this.cropper = cropper
  }
  ready() {
    this.setState({
      ready: true
    })
    Toast.hide()
  }
  cancelCropper() {
    this.props.getCropData('')
    history.go(-1)
  }
  confirmCropper() {
    this.props.getCropData(this.state.DataURL)
    history.go(-1)
  }

  render() {
    return (
      <div className={this.state.ready ? 'image-cropper image-cropper-ready' : 'image-cropper'}>
        <div className='cropper-wrapper'>
          <Cropper
            viewMode={1}
            src={this.props.cropperImageUrl}
            minContainerHeight={300}
            minCropBoxHeight={200}
            style={{width: '100%'}}
            aspectRatio={1}
            initialAspectRatio={1}
            guides={false}
            dragMode={'move'}
            cropBoxMovable={false}
            cropBoxResizable={false}
            toggleDragModeOnDblclick={false}
            crop={this.crop.bind(this)}
            onInitialized={this.onInitialized.bind(this)}
            ready={this.ready.bind(this)}
          />
        </div>
        {
          this.state.ready ?
            <div className='image-cropper-button'>
              <div className='btn-lg btn-lg-gray image-cropper-button-cancel' onClick={()=>this.cancelCropper()}>取消</div>
              <div className='btn-lg image-cropper-button-confirm' onClick={()=>this.confirmCropper()}>确定</div>
            </div>
            : ''
        }
      </div>
    )
  }
}
export default CropperImage
