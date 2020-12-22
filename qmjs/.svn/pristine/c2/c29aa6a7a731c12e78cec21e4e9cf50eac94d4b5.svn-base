import {Button, Form, Input, Select, DatePicker, Checkbox, Image, Cascader    } from 'antd'
import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import {connect, history} from 'umi'
import moment from 'moment'
import UploadImages from '@/components/UploadImages'
import {formatDate} from '@/utils/utils'
import cityData from '@/assets/province_city_area/province_city_area.json'
import nationData from '@/assets/nation/nationality.json'

const { TextArea } = Input;

const CustomFormLook = ({ events: { formData = [], } }) => {
  console.log('formData')
  console.log(formData)

  let formDom = []
  formData && formData.map((item)=> {
    item.map(data => {
      if (data.type && data.type.value === 0 && data.expand.value) {
        formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}
          >
            <Input defaultValue={data.expand.value} disabled/>
          </Form.Item>
        )
      }
  
  
  
      if (data.type  && data.type.value === 1 && data.expand.value ) {
        formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}
          >
            <TextArea rows={4} defaultValue={data.expand.value} disabled></TextArea>
          </Form.Item>
        )
      }
  
  
      if (data.type && data.type.value === 2 && data.expand.selectedItemIndex.length > 0) {
        formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}
          >
            <Select allowClear defaultValue={data.expand.selectedItemIndex[0]} disabled>
              {
                data.expand.items.map(((item, index) => (
                  <Select.Option value={item.value} key={index}>{item.label}</Select.Option>
                )))
              }
            </Select>
          </Form.Item>
        )
      }
      if (data.type && data.type.value === 3 && data.expand.selectedItemIndex.length > 0) {
        formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}
            initialValue={''}
          >
            <div style={{display: 'flex'}}>
              {
                data.expand.items.length > 0 ?
                data.expand.items.map(((item, index) => (
                  <div style={{marginLeft: '5px'}}>
                    <Checkbox defaultChecked={data.expand.selectedItemIndex.indexOf(item.itemIndex) > -1} disabled />
                    <span style={{marginLeft: '5px'}}>{item.item}</span>
                  </div>
                )))
                : ''
              }  
            </div>
            
          </Form.Item>
        )
      }
      if (data.type && data.type.value === 4 && data.expand.value) {
        formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}
          >
            <Input disabled defaultValue={data.expand.value}/>
          </Form.Item>
        )
      }
  
      if (data.type && data.type.value === 5 && data.expand.value) {
        formDom.push(
          <div>
            <Form.Item
              name={data.pkId}
              label={'证件类型'}
            >
              <Input disabled defaultValue={data.expand.items[data.expand.selectedItemIndex[0]].item}/>
            </Form.Item>
            <Form.Item
              name={data.pkId}
              label={'证件号码'}
            >
              <Input defaultValue={data.expand.value} disabled/>
            </Form.Item>
          </div>
        )
      }
  
      if (data.type && data.type.value === 6 && data.expand.images.length > 0) {
        formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}>
            {
              data.expand && data.expand.images && data.expand.images.map(item => {
                return <Image
                  width={50}
                  height={50}
                  src={item.thumbnail}
                />
              })
            }
          </Form.Item>
        )
      }

      if (data.type && data.type.value === 7 && data.expand.selectedItemIndex.length > 0) {
        formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}>
             <Cascader options={cityData} value={data.expand.selectedItemIndex} disabled/>
          </Form.Item>
        )
      }
  


  
      if (data.type && data.type.value === 8 && data.expand.value) {
          formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}
          >
            <DatePicker defaultValue={moment(formatDate(data.expand.value,'yyyy-MM-dd HH:mm:ss'), 'YYYY/MM/DD')} format={'YYYY/MM/DD'} disabled />
          </Form.Item>
        )
      }
  
      if (data.type && data.type.value === 9 && data.expand.value) {
        formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}
          >
            <Input disabled defaultValue={data.expand.value}/>
          </Form.Item>
        )
      }

      if (data.type && data.type.value === 10 && data.expand.selectedItemIndex.length > 0) {
        
        formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}
          >
            <Select defaultValue={data.expand.selectedItemIndex[0]} disabled>
              {
                nationData.map(((item, index) => (
                  <Select.Option value={item.value} key={index}>{item.label}</Select.Option>
                )))
              }
            </Select>
          </Form.Item>
        )
      }
  
      if (data.type && data.type.value === 11 && data.expand.images.length > 0) {
        formDom.push(
          <Form.Item
            name={data.pkId}
            label={data.labelName}>
            {
              data.expand && data.expand.images && data.expand.images.map(item => {
                return <Image
                  width={50}
                  height={50}
                  src={item.thumbnail}
                />
              })
            }
          </Form.Item>
        )
      }
    })
    

    



    
    // if (data.type.value === 5) {
    //   formDom.push(
    //     <Form.Item
    //       name={data.pkId}
    //       label={data.label}
    //       initialValue={data.defaultValue ? moment(new Date(data.defaultValue), data.expand.format) : ''}
    //     >
    //       <DatePicker format={data.expand.format} disabled placeholder={''}/>
    //     </Form.Item>
    //   )
    // }
    // if (data.type.value === 6 && data.expand.type.value === 0) {
    //   let imageList = []
    //   data && data.defaultValue && data.defaultValue.map(item => {
    //     imageList.push({ url: item })
    //   })
    //   formDom.push(
    //     <Form.Item
    //       name={data.pkId}
    //       label={data.label}
    //       initialValue={''}
    //     >
    //       <UploadImages fileList={imageList} disabled={true}/>
    //     </Form.Item>
    //   )
    // }
  })
  return formDom
}

export default connect(({ events }) => ({
  events,
}))(CustomFormLook)
