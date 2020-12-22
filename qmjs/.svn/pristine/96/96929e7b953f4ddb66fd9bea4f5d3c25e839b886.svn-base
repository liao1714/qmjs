import {Modal,Table,message} from 'antd'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import {connect} from 'umi'
import { DndProvider, useDrag, useDrop, createDndContext, Button } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import {getPermissions} from '@/utils/accountInfo'

const Sort = ({ hideSort, dispatch, location: { locationPageHomeBannerSortList = [] } }) => {
  console.log(locationPageHomeBannerSortList)

  const RNDContext = createDndContext(HTML5Backend)
  const type = 'DragableBodyRow'
  const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
    const ref = React.useRef()
    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: type,
      collect: monitor => {
        const { index: dragIndex } = monitor.getItem() || {}
        if (dragIndex === index) {
          return {}
        }
        return {
          isOver: monitor.isOver(),
          dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
        }
      },
      drop: item => {
        moveRow(item.index, index)
      },
    })
    const [, drag] = useDrag({
      item: { type, index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    })
    drop(drag(ref))
    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ''}`}
        style={{ cursor: 'move', ...style }}
        {...restProps}
      />
    )
  }

  const columns = [
    {
      title: '序号',
      key: 'name',
      align: 'center',
      render:(text,record,index)=>`${index+1}`,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: '内容ID',
      dataIndex: 'contentId',
      key: 'contentId',
      align: 'center',
    },
  ]
  const [data, setData] = useState(locationPageHomeBannerSortList)
  const [loadingHandle, setLoadingHandle] = useState(false)
  const DragSortingTable = () => {
    const components = {
      body: {
        row: DragableBodyRow,
      },
    }

    const moveRow = useCallback(
      (dragIndex, hoverIndex) => {
        const dragRow = data[dragIndex]
        setData(
          update(data, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragRow],
            ],
          }),
        )
      },
      [data],
    )

    const manager = useRef(RNDContext)

    return (
      getPermissions().includes('location_sort_page_home_banner') ?
        <DndProvider manager={manager.current.dragDropManager}>
          <Table
            columns={columns}
            dataSource={data}
            components={components}
            pagination={false}
            onRow={(record, index) => ({
              index,
              moveRow,
            })}
          />
        </DndProvider>
        :
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
    )
  }

  const handleSort=()=> {
    console.log(data)
    let sortArray = []
    data.map((item, index) => {
      sortArray.push({
        pkId: item.pkId,
        serialNumber: index + 1,
      })
    })
    setLoadingHandle(true)
    dispatch({
      type: 'location/locationSortPageHomeBanner',
      payload: {sortArray: sortArray} ,
    }).then(res => {
      if (res && res.code === 200) {
        message.success(res.message, 2)
        hideSort()
      }
      setLoadingHandle(false)
    })
  }
  return (
    getPermissions().includes('location_sort_page_home_banner') ?
      <Modal
        width={800}
        title="排序"
        centered
        visible={true}
        onCancel={() => hideSort()}
        onOk={()=> handleSort()}
        confirmLoading={loadingHandle}
        destroyOnClose={true}
      >
        <div className='sort-info'>
          已上线<span className='number'>{locationPageHomeBannerSortList.length}</span>条，序号越小，排序越靠前。
          <span className='operation-info'>(拖拽可进行排序)</span>
        </div>
        <DragSortingTable/>
      </Modal>
      :
      <Modal
        width={800}
        title="排序"
        centered
        visible={true}
        onCancel={() => hideSort()}
        onOk={()=> handleSort()}
        confirmLoading={loadingHandle}
        destroyOnClose={true}
        footer={[]}
      >
        <div className='sort-info'>
          已上线<span className='number'>{locationPageHomeBannerSortList.length}</span>条，序号越小，排序越靠前。
        </div>
        <DragSortingTable/>
      </Modal>
  )
}

export default connect(({ location }) => ({
  location,
}))(Sort)
