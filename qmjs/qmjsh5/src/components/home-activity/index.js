import React, { Component } from 'react'
import './index.less'
import { Modal, Result } from 'antd-mobile'
import { connect } from 'dva'
import IconSVG from '@/components/icon-svg'
import Router from '@/utils/router'
import { formatDate } from '@/utils/methons'
@connect(({ home }) => ({ home }))
class HomeActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modeTypes: [],
      pkId: ''
    }
  }
  toEnroll =(item)=> {
    console.log(item)
    if (item.modeTypes.length === 1) {
      let linkPath = ''
      if(item.modeTypes[0].value === 0) {
        linkPath = '/activity/personalEnroll'
      }else if(item.modeTypes[0].value === 1) {
        linkPath = '/activity/teamEnroll'
      } else if(item.modeTypes[0].value === 2) {
        linkPath = '/activity/familyEnroll'
      }
      Router.push(linkPath, { evensId: item.pkId })
    } else {
      this.setState({
        showModal: true,
        modeTypes: item.modeTypes,
        pkId: item.pkId,
      })
    }
  }
  onClose =()=> {
    this.setState({
      showModal: false
    })
  }
  render() {
    const { home  } = this.props
    return (
      <div className='activity-wrapper'>
        {home.activityList.length > 0 ? home.activityList.map((item, index) => (
          <div
            key={index} className='activity-item'
            onClick={()=>{
              this.props.dispatch({ type: 'buriedPoint/qmjs_homeactivity_click', payload: { objId: item.pkId }})
              Router.push('/activity/detail', { pkId: item.pkId })
            }}
          >
            <div className='activity-title-image'>
              <div className='activity-image-wrapper'>
                <img className='activity-image' src={item.thumbnail && item.thumbnail.length > 0 ? item.thumbnail[0].thumbnail : ''}/>
                <span className='tag'>{item.tagName}</span>
              </div>
              <div className='activity-baseinfo'>
                <div className='activity-title'>{item.title}</div>
                {/* <div className='activity-price'>¥ 500</div> */}
              </div>
              
            </div>
            <div className='activity-detail'>
              <div className='activity-block'>
                {
                  item.address ?
                    <div className='activity-text'>
                      {<IconSVG type={'icon_dizhi'} size={'xxs'} /> }
                      <span className='item-text'>{item.address}</span>
                    </div> : ''
                }
                
                <div className='activity-text'>
                  {item.registrationBeginsTime ? <IconSVG type={'icon_time'} size={'xxs'} /> : ''}
                  <span className='item-text'>{formatDate(item.registrationBeginsTime, 'yyyy-MM-dd HH:mm')}</span>
                </div>
                <div className='activity-text'>
                  <IconSVG type={'icon_ren'} size={'xxs'}/>
                  <span className='item-text'>{item.enrollPersonCount}人已报名</span>
                </div>
              </div>
              
              <div className='activity-number-button-wrapper'>
                {/* <div className='activity-number'>
                  <IconSVG type={'number'} size={'xs'}/>
                  <span>{item.enrollPersonCount}人已报名</span>
                </div> */}
                <div className='activity-number-button'>
                  { item.activityStatus === 0 ? <div className='button-active' onClick={(e)=>{e.stopPropagation()}}>未开始</div> : '' }
                  { item.activityStatus === 1 ?
                    item.enrollFlag ?
                      <div className='button-disabled' onClick={(e)=>{e.stopPropagation()}}>已报名</div> :
                      <div
                        className='button-active'
                        onClick={(e)=>{
                          e.stopPropagation()
                          this.props.dispatch({ type: 'buriedPoint/qmjs_homeactivity_applyclick', payload: { objId: item.pkId }})
                          this.toEnroll(item)
                        }}
                      >立即报名</div>
                    : '' }
                  { item.activityStatus === 2 ? <div className='button-active' onClick={(e)=>{e.stopPropagation()}}>进行中</div> : '' }
                  { item.activityStatus === 3 ? <div className='button-disabled' onClick={(e)=>{e.stopPropagation()}}>已结束</div> : '' }
                </div>
              </div>
            </div>
          </div>
        )) :
          <Result
            className='none-data'
            img={<IconSVG type={'none'} size={'lg'}/>}
            title=""
            message="即将上线，敬请期待！"
          />
        }
        <Modal
          visible={this.state.showModal}
          transparent
          closable={true}
          maskClosable={true}
          onClose={()=>this.onClose()}
          title=""
          footer={[]}
          afterClose={() => { this.setState({showModal: false}) }}
          className={'enroll-modal'}
        >
          <div>
            {
              this.state.modeTypes.map((item, index) => {
                let linkPath = ''
                if(item.value === 0) {
                  linkPath = '/activity/personalEnroll'
                }else if(item.value === 1) {
                  linkPath = '/activity/teamEnroll'
                } else if(item.value === 2) {
                  linkPath = '/activity/familyEnroll'
                }
                return <div className={'enroll-item-wrapper'} key={index}>
                  <div
                    className='btn-md'
                    onClick={() => {
                      Router.push(linkPath, { evensId: this.state.pkId })}
                    }
                  >
                    {item.name}
                  </div>
                </div>
              })
            }
          </div>
        </Modal>
      </div>
    )
  }
}
export default HomeActivity
