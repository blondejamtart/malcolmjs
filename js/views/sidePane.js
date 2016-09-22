/**
 * Created by twi18192 on 01/09/15.
 */

var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactPanels = require('react-panels');
var Dropdown    = require('./dropdownMenu');

//import Button from 'react-bootstrap/lib/Button';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';


var Panel  = ReactPanels.Panel;
//var Tab = ReactPanels.Tab;
var Button = ReactPanels.Button;

var paneActions = require('../actions/paneActions');

var SidePaneTabContents = require('./sidePaneTabContents');

var SidePane = React.createClass(
  {
    propTypes: {
      tabState  : React.PropTypes.arrayOf(React.PropTypes.object),
      listVisible: React.PropTypes.bool,
      selectedTabIndex: React.PropTypes.number
    },
    
    shouldComponentUpdate: function (nextProps, nextState)
      {
      /* Even though all the props of sidePane will need to cause a
       rerender if changed, if I don't put shouldComponentUpdate with
       all of them in, sidePane will rerender whenever sidebar does,
       which isn't quite what I want
       */
      return (
        nextProps.selectedTabIndex !== this.props.selectedTabIndex ||
        nextProps.listVisible !== this.props.listVisible ||
        nextProps.tabState !== this.props.tabState
      )
      },
    
    handleActionTabChangeViaOtherMeans: function (tab)
      {
      console.log('SidePane: handleActionTabChangeViaOtherMeans(): tab = '+tab);
      paneActions.dropdownMenuSelect(tab);
      },
    
    handleActionRemoveBlockTab: function ()
      {
      paneActions.removeBlockTab("this is the item");
      },
    
    componentDidMount: function ()
      {
      ReactDOM.findDOMNode(this).addEventListener('keydown', this.disableTabKey);
      },
    
    componentWillUnmount: function ()
      {
      ReactDOM.findDOMNode(this).removeEventListener('keydown', this.disableTabKey);
      },
    
    disableTabKey: function (e)
      {
      console.log(e);
      if (e.keyCode === 9)
        {
        console.log("tab key!");
        e.preventDefault();
        }
      },
    
    render: function ()
      {
      
      console.log("render: sidePane");
      
      var skin    = this.props.skin || "default",
          globals = this.props.globals || {};
      
      /* Do I need dynamicTab to be something else if tabState is empty? */
      
      console.log(this.props.tabState);
      console.log(this.props.selectedTabIndex);
      
      var dynamicTab;
      
      /* Should I include selectedTabIndex being < 0 too ? */
      if (this.props.tabState.length === 0)
        {
        dynamicTab = [];
        }
      else
        {
        dynamicTab =
          <Tabs id='SidePaneTabs'>
            <Tab key={this.props.tabState[this.props.selectedTabIndex].label + 'tab'}
                 title={this.props.tabState[this.props.selectedTabIndex].label}>
              <SidePaneTabContents key={this.props.tabState[this.props.selectedTabIndex].label + 'contents'}
                                   tabObject={this.props.tabState[this.props.selectedTabIndex]}
              />
            </Tab>
          </Tabs>;
        }
      
      return (
        //var interactIdString = "#" + "dropdownTab" + item;
        
        <Panel theme="flexbox"
               skin={skin} useAvailableHeight={true}
               globals={globals}
               buttons={[
          
                 <Button onButtonClick={this.handleActionRemoveBlockTab}>
                   <i className="fa fa-times"></i>
                   "Remove active tab"
                 </Button>,
                 <DropdownButton id={`dropdown`} title={'dropDown'} bsStyle="link"
                                 onSelect={this.handleActionTabChangeViaOtherMeans}>
                   {this.props.tabState.map(function (tabItem, index)
                                            {
                                            console.log('SidePane: DropdownButon  index = '+index+'  Label = '+tabItem.label);
                                            return <MenuItem eventKey={ index }>{tabItem.label}</MenuItem>;
                                            })}
          
                 </DropdownButton>,
                 /*
                  <Button title="Drop down menu">
                  <div id="dropDown">
                  <Dropdown changeTab={this.handleActionTabChangeViaOtherMeans}
                  tabState={this.props.tabState}
                  listVisible={this.props.listVisible}
                  />
                  </div>
                  </Button>
                  */
        
               ]}>
          {dynamicTab}
        </Panel>
      );
      }
  });

module.exports = SidePane;
