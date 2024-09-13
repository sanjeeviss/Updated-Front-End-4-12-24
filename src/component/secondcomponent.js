import React from 'react'
import {connect} from "react-redux"
const SecondComponent = (props) => {
  return (
    <div></div>
  )
}

const mapStateToProps=(state)=>({state:state})
const mapDispatchToProps=(dispatch)=>({dispatch:dispatch})
export default connect(mapStateToProps,mapDispatchToProps)( SecondComponent)