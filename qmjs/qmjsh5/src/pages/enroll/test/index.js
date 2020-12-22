import React, { Component } from 'react'
import { connect } from 'dva'
import { List, Badge, Picker, NavBar, WingBlank, InputItem, Checkbox, Button, Icon } from 'antd-mobile'

import IconSvg from '@/components/icon-svg'
import EnrollCustomForms from '@/components/enroll-custom-forms'
import { createForm } from 'rc-form'
import './index.less'

@connect(({ activity }) => ({ activity }))
class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgSrc: '',
      imgSize:'',
      imgSize1:'',
      imgList:[],
      showimg:false
    }
    
  }

    componentDidMount() {
      
    }

    addImagesFile() {
      let that=this;
      let imgFile = document.getElementById('images').files[0];
      console.log('imgFile')
      console.log(document.getElementById('images').files)
      let form = new FormData();
      form.append('file', imgFile);

      var imageEle=document.getElementById("images");
      let fileList = imageEle.files;
      var imagSize =  document.getElementById("images").files[0].size;
      this.setState({
          imgSize:(imagSize/1024/1024).toFixed(2)
      });
      let imageDataReader = new FileReader();
      imageDataReader.readAsDataURL(imgFile);
      imageDataReader.onload = function(){
          let imgValue=this.result;
          that.setState({
              imgSrc:imgValue
          });
          if(imagSize>1024*1024*2){
              var img = new Image();
              img.src = imgValue;
              img.onload = function(){
                  var these = this;
                  // 默认按比例压缩
                  var w = these.width * 0.5,
                      h = these.height * 0.5;
                  //生成canvas
                  var canvas = document.createElement('canvas');
                  var ctx = canvas.getContext('2d');
                  // 创建属性节点
                  var anw = document.createAttribute("width");
                  anw.nodeValue = w;
                  var anh = document.createAttribute("height");
                  anh.nodeValue = h;
                  canvas.setAttributeNode(anw);
                  canvas.setAttributeNode(anh);
                  // 压缩图片
                  ctx.drawImage(these, 0, 0, w, h);
                  // quality 默认图片质量为0.7, quality值越小，所绘制出的图像越模糊
                  // toDataURL将画布转化为base64格式信息图像
                  var base64 = canvas.toDataURL('image/jpeg', 0.7);
                  document.getElementById("image1").src=base64;
                  var strLength = base64.length;
                  var fileLength = parseInt(strLength - (strLength / 8) * 2);
                  // 由字节转换为KB
                  var size = "";
                  size = (fileLength / 1024 / 1024).toFixed(2);
                  that.setState({imgSize1:size});
              }
              that.setState({showimg:true});

          }
      }
  }
  addmanyImagesFile(){
      let that=this;
      var imageEle=document.getElementById("images3");
      let fileList = imageEle.files;
      for(var i=0;i<fileList.length;i++){
          let file=fileList[i];
          if(file.name.indexOf(",") !==-1 ||  file.name.indexOf("，") !==-1) {
              alert('图片名不能含有逗号');
              return;
          }
          let imageDataReader = new FileReader();
          imageDataReader.readAsDataURL(file);
          imageDataReader.onload = function(){
            let size= file.size;
            let name= file.name;
            let imgSrc=this.result;
            if(size>1024*1024*2){
                  var img = new Image();
                  img.src = imgSrc;
                  img.onload = function(){
                      var these = this;
                      // 默认按比例压缩
                      var w = these.width * 0.6,
                          h = these.height * 0.6;
                      //生成canvas
                      var canvas = document.createElement('canvas');
                      var ctx = canvas.getContext('2d');
                      // 创建属性节点
                      var anw = document.createAttribute("width");
                      anw.nodeValue = w;
                      var anh = document.createAttribute("height");
                      anh.nodeValue = h;
                      canvas.setAttributeNode(anw);
                      canvas.setAttributeNode(anh);
                      // 压缩图片
                      ctx.drawImage(these, 0, 0, w, h);
                      // quality 默认图片质量为0.7, quality值越小，所绘制出的图像越模糊
                      // toDataURL将画布转化为base64格式信息图像
                      var base64 = canvas.toDataURL('image/jpeg', 0.7);
                      imgSrc=base64;
                      var strLength = base64.length;
                      var fileLength = parseInt(strLength - (strLength / 8) * 2);
                      // 由字节转换为KB
                      size = (fileLength / 1024 / 1024).toFixed(2);
                      let item={
                          imgSrc:imgSrc,
                          imgName:name,
                          imgSize:size
                      };
                      that.state.imgList.push(item);
                      that.setState({imgList:that.state.imgList});
                  }
            }else{
              let item={
                  imgSrc:this.result,
                  imgName:name,
                  imgSize:(size /1024/1024).toFixed(2)
              };
              that.state.imgList.push(item);
              that.setState({imgList:that.state.imgList});
            }
          }
      }
  }

 

  
  
  render() {
    return (
      <div>
          <h3>单张图片压缩</h3>
          <div className="container">
              <div className="com1">
                  <input type="file" id={'images'} onChange={this.addImagesFile.bind(this)} />
                  <br />
                  {
                      this.state.imgSrc !== ''?(
                          <figure>
                              <img src={this.state.imgSrc} style={{width: '200px',height: '200px'}} id="image0" alt="" className="imgstyle"/>
                              <figcaption>图片大小为：{this.state.imgSize}M</figcaption>
                          </figure>
                      ):null
                  }
              </div>
              {
                  this.state.showimg ? (
                      <div className="com1">
                          <div>压缩后的图片</div>
                          <figure>
                              <img src="" id="image1" alt="" className="imgstyle" style={{width: '200px',height: '200px'}}/>
                              <figcaption>压缩后的图片大小为：{this.state.imgSize1}M</figcaption>
                          </figure>
                     </div>
                  ):null
              }
          </div>
          <h3>多张图片上传</h3>
          <div className="com1">
                  <input type="file" id={'images3'} onChange={this.addmanyImagesFile.bind(this)} multiple/>
                  <br/>
                  <div className="com2">
                      {
                          this.state.imgList.length > 0 ?(
                              this.state.imgList.map((item,index) =>{
                                  return (
                                      <figure key={index}>
                                          <img src={item.imgSrc} id="image4" alt="" className="imgstyle1"/>
                                          <figcaption>图片名：{item.imgName}<br/>  图片大小为：{item.imgSize}M</figcaption>
                                      </figure>
                                  )
                              })
                          ):null
                      }
                  </div>
          </div>
      </div>
    );
  }
}

export default Test

