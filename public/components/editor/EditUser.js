import React from 'react';
import axios from 'axios';
import crypto from 'crypto';
import EditButton from './EditButton';
import Label from './Label';
import DropdownItem from '../menu/DropdownItem';
import DropdownMenu from '../menu/DropdownMenu';
import TouchButtonRight from './TouchButtonRight';
import Small from './Small';
import { connect } from 'react-redux';
import RemoveItem from '../create/RemoveItem';

class EditUser extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            inEditMode: false,
            users: [],
            value: '',
            filteredUsers: [],
            user: {}
        }

        this.save = this.save.bind(this);
        this.setFieldValue = this.setFieldValue.bind(this);
        this.selfAssign = this.selfAssign.bind(this);
        this.setEditMode = this.setEditMode.bind(this);
    }

    componentWillMount(){
        axios.get('/users/get-users')
        .then(response =>{
            this.setState({users: response.data, filteredUsers: response.data});
        });
    }

    componentWillReceiveProps(nextProps, nextState){
        if(nextProps.user.email){
            axios.get('/user/' + nextProps.user.email)
            .then(response => {
                this.setState({user: response.data});
            });
        }
    }

    save(){
        this.setState({inEditMode: false}, () => {
            this.props.save ? this.props.save(this.state.user) : null;
        }); 
    }

    setFieldValue(event){
        this.setState({
            value: event.target.value}, () => {
            this.setState({filteredUsers: this.state.users.filter(user => {
                return (user.name.includes(this.state.value)) || (user.email.includes(this.state.value));
            })
        })});
    }
    
    setUser(user){
        this.setState({user: user, value: user.name});
    }

    setEditMode(){
        this.setState({inEditMode: !this.state.inEditMode});
    }

    selfAssign(event){
        event.preventDefault();
        this.props.save != undefined || this.props.save != null ? this.props.save({email: this.props.currentUser}) : {};
    }

    render(){
        return(
            <div class="form-group">
                <div class={"d-flex flex-row"}>  
                    <Label label={this.props.label}/>
                </div>
                {
                    !this.state.inEditMode ? 
                    <div class={"d-flex flex-row text-truncate"}>
                        <RemoveItem remove={this.setEditMode} canEdit={this.props.canEdit}>
                            <img class="knbn-profile-pic mr-1 my-auto" src={this.state.user.email ? 'https://www.gravatar.com/avatar/' + crypto.createHash('md5').update(String(this.state.user.email).toLowerCase().trim()).digest('hex') : null}/>
                            {!this.state.user.email ? "Niciun user setat" : this.state.user.name + " \u00B7 " + this.state.user.email}
                        </RemoveItem>
                    </div>

                    :
                    <div class={"input-group dropdown knbn-bg-transparent knbn-transition knbn-border" + (this.props.themeToggled ? " knbn-dark-border-2x knbn-dark-onselect" : " knbn-snow-border-2x knbn-snow-onselect")}>
                        <div class="d-flex flex-row w-100">
                            <input type="text" class={"knbn-input form-control knbn-bg-transparent knbn-font-medium knbn-no-border knbn-no-border-radius knbn-no-box-shadow" + 
                            (this.props.themeToggled == true ? 
                                " knbn-dark-bg-2x knbn-dark-bg-2x-active knbn-dark-color-5x" 
                                : 
                                " knbn-snow-bg-2x knbn-snow-bg-2x-active knbn-snow-color-5x" )} aria-describedby="knbnHelp" 
                                placeholder={this.state.value == undefined || this.state.value.length == 0 ? "Introdu nume user" : ""}
                                value={this.state.value}
                                onChange={this.setFieldValue}
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>

                            <EditButton save={this.save} enableEditMode={this.enterEditMode} edit={this.state.inEditMode}/>
                            <DropdownMenu>
                            {
                                this.state.filteredUsers == undefined || this.state.filteredUsers.length == 0 ? 
                                <div class="col text-truncate knbn-font-medium">Nicio persoană gasită</div>
                                :
                                (
                                    <div>
                                        {this.state.filteredUsers.map(user => 
                                            {
                                                return  <a href="#" key={user.email} onClick={(event)=>{event.preventDefault(); this.setUser(user)}}>
                                                            <DropdownItem>
                                                                <div class="d-flex flex-row knbn-font-medium">
                                                                    <div class="mx-1 d-flex my-auto">
                                                                        <img class="knbn-profile-pic" src={'https://www.gravatar.com/avatar/' + crypto.createHash('md5').update(String(user.email).toLowerCase().trim()).digest('hex')}/>
                                                                    </div>
                                                                    <div class="d-flex w-100 knbn-font-medium"><div class="w-100 my-auto text-truncate">{user.name + " \u00B7 " + user.email}</div></div>
                                                                </div>
                                                            </DropdownItem>
                                                        </a>
                                            })
                                        }
                                    </div>
                                )
                            }
                            </DropdownMenu>
                        </div>
                    </div>
                }
                <Small>{this.props.description}</Small>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        themeToggled: state.themeToggled,
        currentUser: state.currentUser,
        isAdmin: state.isAdmin
    }
}

export default connect(mapStateToProps)(EditUser);