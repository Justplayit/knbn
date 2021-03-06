import React from 'react';
import Label from '../editor/Label';
import Small from '../editor/Small';
import { connect } from 'react-redux';

class InputField extends React.Component{
    constructor(props){
        super(props);

        this.set = this.set.bind(this);
    }

    set(e){
        e.preventDefault();
        this.props.action(e.target.value);
    }

    render(){
        return(
            <div class="form-group knbn-bg-transparent knbn-transition">
                <Label label={this.props.label}/>
                <div class={"knbn-input-grp knbn-fake-input-grp input-group knbn-transition knbn-border" + (this.props.themeToggled ? " knbn-dark-border-2x knbn-dark-onselect" : " knbn-snow-border-3x knbn-snow-onselect")}>
                
                    <input type="text" class={"knbn-input form-control knbn-editing-mode knbn-bg-transparent knbn-transition knbn-no-border-radius knbn-no-border knbn-font-medium knbn-no-box-shadow" + 
                    (this.props.themeToggled == true ? 
                        " knbn-dark-color-4x knbn-dark-bg-2x knbn-dark-bg-2x-active" 
                        : 
                        " knbn-snow-color-4x knbn-snow-bg-3x knbn-snow-bg-3x-active")} aria-describedby="knbnHelp" 
                    placeholder={this.props.value == undefined || this.props.value.length == 0 ? "Introdu caractere" : ""}
                    value={this.props.value}
                    onChange={this.set}
                    />
                
                </div>
                <Small>{this.props.description}</Small>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        themeToggled: state.themeToggled
    }
}

export default connect(mapStateToProps)(InputField);