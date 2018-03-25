import React from "react"
import { bindActionCreators } from "redux"
import styled from "styled-components"
import Tile from "./Tile"
import * as actions from "../../containers/TicTacToe/actions";
import { connect } from "react-redux"

class TicTacToeTile extends React.Component {

    checkresult(){
        if(this.props.winner.name){
            let color;
            console.log(this.props.pattern);
             this.props.pattern.map((position)=>{
                if(position === this.props["data-tile"]){
                    color = "yellow";
                }})

             if(color === "yellow" ) {
                    return "yellow"
             }
             else{

                 return "white"
             }
        }
        else {
            return "white"
        }
    }

    render() {
        return (
            <Tile 
                team={this.props.team}
                data-tile={this.props["data-tile"]} 
                onClick={this.props.onClick}
                color={this.checkresult()}
            />
        )
    }
}
function mapStateToProps(state) {
    return {
        ...state.ticTacToe
    }
}
export default connect(mapStateToProps,null)(TicTacToeTile)