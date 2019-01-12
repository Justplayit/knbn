import React from 'react';
import Label from '../editor/Label';
import Small from '../editor/Small';
import DropdownItem from '../menu/DropdownItem';
import DropdownMenu from '../menu/DropdownMenu';
import { connect } from 'react-redux';
import SelectionRemover from './SelectionRemover';
import RemoveItem from './RemoveItem';

class PriorityField extends React.Component{
    render(){
        return(
            <div class="form-group knbn-bg-transparent">
                <Label label="Priority"/>
                <div class={"knbn-input-grp knbn-fake-input-grp input-group dropdown knbn-bg-transparent knbn-transition" + (this.props.themeToggled ? " knbn-dark-border-2x knbn-dark-onselect" : " knbn-snow-border-2x knbn-snow-onselect")}>

                    {
                        this.state.priority.name != undefined ? 
                        <SelectionRemover>
                            <RemoveItem item={this.state.priority.name} remove={this.removeItem}/>
                        </SelectionRemover>
                        :
                        <input type="text" class={"knbn-input form-control knbn-bg-transparent" + 
                            (this.props.themeToggled == true ? 
                                " knbn-dark-bg-2x knbn-dark-bg-2x-active knbn-dark-color-4x" 
                                : 
                                " knbn-snow-bg-2x knbn-snow-bg-2x-active knbn-snow-color-4x")} 
                        id="knbnFieldLabel" 
                        aria-describedby="knbnHelp" 
                        placeholder={this.state.value == undefined || this.state.value == undefined || this.state.value.length == 0 ? "Enter priority" : ""}
                        value={this.state.value}
                        onChange={this.setValue}
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                    }

                    <DropdownMenu classes="w-100">
                        {
                            this.state.items == undefined || this.state.items.length == 0 ? 
                                'No items found'
                                :
                                this.state.filteredItems.map(item => {
                                    return  <a href="#" key={item.id} onClick={(event)=>{event.preventDefault(); this.set(item)}}>
                                                <DropdownItem>{item.name}</DropdownItem>
                                            </a>})
                        }
                    </DropdownMenu>
                </div>
                <Small>{this.props.description}</Small>
            </div>
        );
    }

    constructor(props){
        super(props);

        this.state = {
            value: '',
            priority: {},
            items: [],
            filteredItems: [],
        }

        this.set = this.set.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.setValue = this.setValue.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentWillMount(){
        this.setState({items: this.props.priorities, priority: this.props.value, filteredItems: this.props.priorities, value: this.props.value.name});
    }

    componentWillReceiveProps(nextProps, nextState){
        this.setState({priority: nextProps.value, value: nextProps.value.name}, () => {this.filterItems})
    }

    set(item){
        this.props.action(item);
    }

    setValue(e){
        console.log(e.target.value);
        this.setState({value: e.target.value}, () => {this.filterItems();});
    }

    filterItems(){
        this.setState({filteredItems: this.state.items.filter(item => {
            return item.name.toLowerCase().includes(this.state.value.toLowerCase())})
        })
    }

    removeItem(){
        this.set({});
    }
}

const mapStateToProps = (state) => {
    return {
        themeToggled: state.themeToggled,
        priorities: state.priorities
    }
}

export default connect(mapStateToProps)(PriorityField);