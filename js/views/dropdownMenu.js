/**
 * Created by twi18192 on 01/09/15.
 */

var React = require('react');
var sidePaneStore = require('../stores/sidePaneStore');
var sidePaneActions = require('../actions/sidePaneActions');

var paneStore = require('../stores/paneStore');

var interact = require('../../node_modules/interact.js');

function getDropdownState(){
  return{
    listVisible: sidePaneStore.getDropdownState(),
    tabState: paneStore.getTabState(),
    selectedTabIndex: paneStore.getSelectedTabIndex()
  }
}


var Dropdown = React.createClass({

  getInitialState: function() {
    return getDropdownState();
  },

  _onChange: function(){
    this.setState(getDropdownState())
  },

  handleActionShow: function(){
    sidePaneActions.dropdownMenuShow("this is the item");
    document.addEventListener("click", this.handleActionHide);
  },

  handleActionHide: function(){
    sidePaneActions.dropdownMenuHide("this is the item");
    document.removeEventListener("click", this.handleActionHide);
  },

  testSelectInvokeSidePane: function(item){
    this.props.changeTab(item)
  },

  componentDidMount: function(){
    sidePaneStore.addChangeListener(this._onChange);

    //interact('.dropdown-display')
    //  .on('tap', this.handleActionShow)
  },

  componentWillUnmount: function(){
    sidePaneStore.removeChangeListener(this._onChange);

    //interact('.dropdown-display')
    //  .off('tap', this.handleActionShow)
  },

  renderListItems: function() {
    var items = [];
    for (var i = 0; i < this.state.tabState.length; i++) {
      var item = this.state.tabState[i].label;
      items.push(<div key={item + "-tab"} className="dropdownTab" onClick={this.testSelectInvokeSidePane.bind(null, item)}>
        <span >{item}</span>
      </div>);
    }

    return items;
  },

  render: function(){


    return <div className={"dropdown-container" + (this.state.listVisible ? " handleActionShow" : "")}>
      <div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")}
           onClick={this.handleActionShow}>
        <span ></span>
        <i className="fa fa-angle-down"></i>
      </div>
      <div className="dropdown-list">
        <div>
          {this.renderListItems()}
        </div>
      </div>
    </div>;

  }
});

module.exports = Dropdown;


//handleActionDropdownSelect: function(item){
//  sidePaneActions.dropdownMenuSelect(item);
//  this.props.changeTab(this.state.selectedTabIndex);
//  //this.handleActionReactPanelSelect()
//},
//
//handleActionReactPanelSelect: function(){
//  sidePaneActions.reactPanelSelect("this is the item")
//},



//select: function(item) {
//  var test = item;
//  console.log(item);
//
//  for(var i = 0; i < this.props.list.length; i++){
//    if(this.props.list[i].name === item){
//      var findTheIndex = i
//    }
//  }
//  //
//  //var findTheIndex = this.props.list.indexOf(item);
//  this.props.changeTab(findTheIndex)
//},
