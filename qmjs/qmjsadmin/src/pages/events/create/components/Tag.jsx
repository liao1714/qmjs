import React, {Component, useState, useEffect} from 'react'
import {Modal, Tag, Button, Input, message, Form} from 'antd'
import { PlusOutlined, FormOutlined, ExclamationCircleOutlined   } from '@ant-design/icons'
import { connect } from 'umi'
import '../index.less'
const { confirm } = Modal
const { Search } = Input
const TagComponent =({ hideAddTag, showAddTag, dispatch, events: { tagList = [] }, loading })=> {
  useEffect(() => {
    dispatch({
      type: 'events/tagList',
      payload: {tagName: ''} ,
    })
  }, [])

  const [newTags, setNewTags] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [editTagModal, setEditTagModal] = useState(false)
  const [tagForm] = Form.useForm()
 
  const handleClose =()=> {
    confirm({
      title: '确认删除该标签吗?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  const addNewTags =(value)=> {
    if (value) {
      let valueList = [...newTags]
      valueList.push({
        id: new Date().getTime(),
        tagName: value
      })
      setNewTags(valueList)
    }
  }
  const deleteNewTags =(id)=> {
    let valueList = newTags
    valueList = valueList.filter(item=>item.id !== id)
    setNewTags(valueList)
  }
  const addTags =()=>{
    console.log(newTags)
    if (newTags.length >0) {
      let arr = []
      setConfirmLoading(true)
      newTags.map(item => {
        arr.push({
          tagName: item.tagName
        })
      })
      dispatch({
        type: 'events/addTag',
        payload: {tags: arr},
      }).then(res => {
        if (res && res.code === 200) {
          message.success(res.message, 2)
          dispatch({
            type: 'events/tagList',
            payload: {tagName: ''} ,
          })
          hideAddTag()
        }
        setConfirmLoading(false)
      })
    }
  }

  const dragStart=(e, index)=>{
    e.dataTransfer.setData('item', JSON.stringify(index))
  }

  const drop=(e, index)=>{
    e.preventDefault()
    const info = JSON.parse(e.dataTransfer.getData('item'))
    let newSortAry = swapArray(tagList, info, index)
    dispatch({
      type: 'events/tagSort',
      payload: {tags: newSortAry} ,
    }).then(res => {
      if(res.code == 200) {
        dispatch({
          type: 'events/tagList',
          payload: {tagName: ''} ,
        })
      }
    })
  }
  const dragOver=(e)=>{
    e.preventDefault()// 此处的代码是必须的  不然无法拖拽
  }

  const swapArray = (arr, index1, index2) =>{
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
  }

  const editTag = (tagName, pkId, sortNumber) =>{
    setEditTagModal(true)
    tagForm.setFieldsValue({
      tagName: tagName,
      pkId: pkId,
      sortNumber: sortNumber
    })
  }

  const tagModalCancel = () =>{
    setEditTagModal(false)
  }

  const confirmEditTag = () => {
    setEditTagModal(false)
    let obj = {
      tagName: tagForm.getFieldValue('tagName'),
      pkId: tagForm.getFieldValue('pkId'),
      sortNumber: tagForm.getFieldValue('sortNumber')
    }
    let params = [obj]
    dispatch({
      type: 'events/tagEdit',
      payload: {tags: params} ,
    }).then(res => {
      if(res.code == 200) {
        message.success(res.message, 2)
        dispatch({
          type: 'events/tagList',
          payload: {tagName: ''} ,
        })
      }
    })
  }

  return (
    <div>
      <Modal
        title="删除标签"
        visible={editTagModal}
        onOk={confirmEditTag}
        onCancel={tagModalCancel}
      >
        
      </Modal>
      <Modal
        title="编辑标签"
        visible={editTagModal}
        onOk={confirmEditTag}
        onCancel={tagModalCancel}
      >
        <Form
          form={tagForm}
          name="basic"
          initialValues={{
            tagName: ''
          }}
        >
          <Form.Item
            label="标签名"
            name="tagName">
            <Input />
          </Form.Item>
          <Form.Item name= "pkId"  hidden>
            <Input />
          </Form.Item>
          <Form.Item name= "sortNumber"  hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        className='tag-wrapper'
        title="新增标签"
        centered
        visible={showAddTag}
        onCancel={hideAddTag}
        onOk={addTags}
        confirmLoading={confirmLoading}
      >
        <div className='add-new-button'>
          <Search
            allowClear
            maxLength={5}
            placeholder="请输入标签名称"
            enterButton={<span><PlusOutlined/>添加</span>}
            size="middle"
            style={{ width: 250 }}
            onSearch={value => addNewTags(value)}
          />
          <div className='message-info'>每个标签最多五个字符</div>
        </div>
        <div className='tags-list-wrapper'>
          {
            newTags && newTags.map((item, index)=>(
              <Tag
                color="blue"
                key={index}
                closable
                onClose={e => {
                  e.preventDefault()
                  deleteNewTags(item.id)
                }}
                onDragStart={(e)=>dragStart(e, index)}
              >
                {item.tagName}
                {/* <EditOutlined /> */}
              </Tag>
            ))
          }
          {
            tagList && tagList.map((item, index)=>(
              <Tag
                color="#2db7f5"
                key={index}
                // closable
                // onClose={e => {
                //   e.preventDefault()
                //   handleClose(item)
                // }}
                // draggable={true}
                // onDragStart={(e)=>dragStart(e, index)}
                // onDrop={(e)=>drop(e, index)}
                // onDragOver={(e)=>dragOver(e)}
              >
                {item.tagName}
                {/* <FormOutlined onClick={()=> editTag(item.tagName, item.pkId, item.sortNumber)} /> */}
              </Tag>
            ))
          }
        </div>
      </Modal>
    </div>
    

    


  )
}
export default connect(({ events, loading }) => ({
  events,
  loading: loading.models.events,
}))(TagComponent)
