import React, { Component } from 'react'
class IconSVG extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { type, size  } = this.props
    const className = type
    const IconSvg = ({ type, size, ...restProps }) => {
      type = require('../../assets/svg/'+ type +'.svg')
      return (
        <svg
          className={`am-icon am-icon-${type.default.id} am-icon-${size} ${className}`}
          {...restProps}
        >
          <use xlinkHref={`#${type.default.id}`} />
        </svg>
      )
    }
    return <IconSvg onClick={this.props.onClick} type={type} size={size}/>
  }
}
export default IconSVG
