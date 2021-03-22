import React, { Component } from "react";
export default class PopUp extends Component {
    handleClick = () => {
        this.props.toggle();
    };
    render() {
        return (
            <div className="modal">
                <br />
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick} style={{color: 'red', borderStyle: 'dotted', padding: '2px'}}>&times;Close    </span>
                </div>
                <img src={"https://s.faketrumptweet.com/kjogvwvg_a8o599_ixl1el.png"} style = {{marginBottom: '50%'}} />
            </div>
        );
    }
}