import React from 'react';
import { connect } from 'react-redux';

const SelectionRemover = (props) => {
    return(
        <div class={"knbn-input form-control knbn-bg-transparent px-2 knbn-transition knbn-no-border knbn-no-border-radius" + 
        (props.themeToggled == true ? 
            " knbn-dark-bg-2x knbn-dark-bg-2x-active knbn-dark-color-4x knbn-dark-border-2x" 
            : 
            " knbn-snow-bg-2x knbn-snow-bg-2x-active knbn-snow-color-4x knbn-snow-border-2x")}>
            {props.children}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        themeToggled: state.themeToggled,
    }
}

export default connect(mapStateToProps)(SelectionRemover);