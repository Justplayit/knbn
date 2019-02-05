import React from 'react';
import { connect } from 'react-redux';

const RemoveItemSmall = (props) => {
    return(
        <div class={"d-flex flex-row h-100 pr-0 knbn-bg-transparent knbn-transition knbn-no-border knbn-no-border-radius" + (props.themeToggled ? " knbn-dark-bg-remover knbn-dark-border-2x knbn-dark-color-5x" : " knbn-snow-bg-remover knbn-snow-border-2x knbn-snow-color-5x") + (props.classes ? " " + props.classes : "")}>
            <div class={"d-flex ml-2 mr-auto knbn-font-medium h-100 text-truncate knbn-transition knbn-bg-transparent"}>
                <div class="my-auto">
                    {props.children}
                </div>
            </div>
            {
            props.remove != undefined ? 
            <div class="d-flex my-auto ml-2 knbn-transition" onClick={props.remove}>
                {
                    props.imageSrc != undefined && props.imageSrc.length > 0? 
                    <img src={props.imageSrc} class={"my-auto knbn-remove-btn mr-1 knbn-transition" + (props.themeToggled ? "" : " knbn-img-inverted")}/>
                    :
                    <img src="./images/close.svg" class={"my-auto knbn-remove-btn mr-1 knbn-transition"  + (props.themeToggled ? "" : " knbn-img-inverted")}/>
                }
            </div>
            : null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        themeToggled: state.themeToggled,
    }
}

export default connect(mapStateToProps)(RemoveItemSmall);