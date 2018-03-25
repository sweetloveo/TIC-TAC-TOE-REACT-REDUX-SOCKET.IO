import React from "react"

import { connect } from "react-redux"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import Wrapper from "./Wrapper"
import ChalkButton from "../../components/ChalkButton"
import * as actions from "../HomePage/actions";
import swal from 'sweetalert';


class HomePage extends React.Component {
    nameadded(e){

        let result;
        // let person = prompt("Please enter your name:", "โปรดใส่ชื่อตรงนี้");
        // if (person == null || person == "") {
        //     result = false;
        // } else {
        //     result = true;
        // }
        swal("กรอกชื่อของคุณลงที่นี่:", {
            content: "input",
        })
            .then((value) => {
                this.props.nameAdded(value);
                swal(`ยินดีต้อนรับคุณ: ${value}`);
                setTimeout(() => this.props.push("/online"), 1000)
            });
    }
    render() {
        return (
            <Wrapper>
                <div style={{display:'block'}}>
                <img src={'/assets/images/logo.png'} alt="LOGO" style={{width: 350, height: 350}} className="img-responsive"/>
                </div>
               <ChalkButton style={{marginTop:'-14rem',color:'#f6f6f6'}} onClick={(e)=>(this.nameadded(e))}>เข้าสู่เกม</ChalkButton>
            </Wrapper>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        push,
        ...actions
    }, dispatch)
}
export default connect(null, mapDispatchToProps)(HomePage)