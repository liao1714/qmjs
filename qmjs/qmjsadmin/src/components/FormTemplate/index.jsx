import React, {useState, useEffect} from 'react'
import { Modal, Tag, Input, message, Button, Form, Radio, Row, Col  } from 'antd'
import { connect } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import './index.less'


const FormTemPlate =({ dispatch, formTemplate: { templateList } })=> {

  const onChange =(e)=> {
    console.log('233')
    console.log('radio checked', e.target.value);
  }
  return (
    <Radio.Group value={''} onChange={onChange}>
      {
        templateList.map((item, index)=> (
          <div>
            <Radio  value={item.id}>
              {item.name}
              <Button type="text" onClick={()=>handleShowConfirmForm(1, item.id)}>删除</Button>
            </Radio>
          </div>
        ))
      }
    </Radio.Group>
  )
}
export default connect(({ formTemplate, loading }) => ({
  formTemplate,
  loading: loading.models.events,
}))(FormTemPlate)
