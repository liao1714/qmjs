import React, {Component, useState, useEffect} from 'react'
import {Modal, Tag, Button, Input, message} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'umi'
import '../index.less'
const { Search } = Input
const TagComponent =({ hideAddTag, showAddTag, dispatch, events: { tagList = [] }, loading })=> {
  useEffect(() => {
    dispatch({
      type: 'events/tagList',
      payload: {tagName: ''} ,
    })
  }, [])
  console.log(tagList)
  const [newTags, setNewTags] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleClose =()=> {}
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
  return (
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
            >
              {item.tagName}
            </Tag>
          ))
        }
        {
          tagList && tagList.map((item, index)=>(
            <Tag
              color="#2db7f5"
              key={index}
              onClose={e => {
                e.preventDefault()
                handleClose(item)
              }}
            >
              {item.tagName}
            </Tag>
          ))
        }
      </div>
    </Modal>
  )
}
export default connect(({ events, loading }) => ({
  events,
  loading: loading.models.events,
}))(TagComponent)
