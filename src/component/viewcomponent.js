// import React from 'react'
// import {connect} from "react-redux"
// import { addEntity,viewById } from '../reduxcomp/actions/actionfunctions'
// import { PAYMEMPLOYEE } from '../serverconfiguration/controllers'
// import PaymEmployeeForm from '../components/paymEmployee/paymEmployeeForm'
// const ViewComponent = (props) => {

//   return (
//     <div>

//         <button
//         onClick={()=>{

//             var obj={
//               value:"",
//               controller:PAYMEMPLOYEE
//             }
//    props.dispatch(viewById(obj))
//         }}
//         >Change State to View</button>
//        {/*

//         console.log(props.state.map((e)=>{
//           if(typeof(e)!=Array)
//           {
//                     console.log(JSON.stringify(e)+" attrib")
//                     console.log(e.pnCompanyId)
//                     console.log(e.employeeFirstName)
//           }
//         }))
//       */
//               props.state.map((e)=>{
//                 console.log(e)
//                 return <li key={e}>{e.pnCompanyId} {e.employeeFirstName}
//                 {
//                   e.paymEmpDeductions.map((p)=>{
//                     return <li>{p}</li>
//                   })
//                 }
//                 </li>
//               })

//       }
//       <PaymEmployeeForm/>
//     </div>
//   )
// }
// const mapStateToProps=(state)=>({state:state})
// const mapDispatchToProps=(dispatch)=>({dispatch:dispatch})
// export default connect(mapStateToProps,mapDispatchToProps)(ViewComponent)
