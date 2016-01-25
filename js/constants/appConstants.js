/**
 * Created by twi18192 on 25/08/15.
 */

var appConstants = {
  FOOTER_TOGGLE: "FOOTER_TOGGLE", /*mainPaneStore use*/
  CONFIG_TOGGLE: "CONFIG_TOGGLE",
  FAV_TOGGLE: "FAV_TOGGLE",

  ADD_TAB: "ADD_TAB", /*paneStore use*/
  REMOVE_TAB: "REMOVE_TAB",
  DROPDOWN_SELECT: "DROPDOWN_SELECT",
  FAVTAB_OPEN: "FAVTAB_OPEN",
  CONFIGTAB_OPEN: "CONFIGTAB_OPEN",
  PASS_DISPATCHMARKER: "PASS_DISPATCHMARKER",
  APPENDSTUFF_FORNEWBLOCK: "APPENDSTUFF_FORNEWBLOCK",
  CHANGE_INFO: "CHANGE_INFO",

  DROPDOWN_SHOW: "DROPDOWN_SHOW", /*sidePaneStore use*/
  DROPDOWN_HIDE: "DROPDOWN_HIDE",
  PASS_SIDEPANE: "PASS_SIDEPANE",

  MOCK_SERVERREQUEST: "MOCK_SERVERREQUEST", /* deviceStore use*/
  UPDATEBLOCKCONTENT_VIASERVER: "UPDATEBLOCKCONTENT_VIASERVER",

  FETCHNEWCHANNEL_VALUE: "FETCHNEWCHANNEL_VALUE", /* sessionActions use */
  PROPERSERVERREQUEST_TOADDCHANNELCHANGEINFO: "PROPERSERVERREQUEST_TOADDCHANNELCHANGEINFO",

  PASSUPDATEDCHANNEL_VALUE: "PASSUPDATEDCHANNEL_VALUE", /* serverActions use */
  PASSNAMEOFCHANNELTHATSBEEN_SUBSCRIBED: "PASSNAMEOFCHANNELTHATSBEEN_SUBSCRIBED",


  //REACTPANEL_SELECT: "REACTPANEL_SELECT",
  //REDBLOCKSTATE_CHANGE: "REDBLOCKSTATE_CHANGE",
  //SWITCHTAB_WHENTABOPENS: "SWITCHTAB_WHENTABOPENS",
  //PASSING_SIDEPANE: "PASSING_SIDEPANE"

  //REDBLOCKTAB_OPEN: "REDBLOCKTAB_OPEN",
  //BLUEBLOCKTAB_OPEN: "BLUEBLOCKTAB_OPEN",
  //GREENBLOCKTAB_OPEN: "GREENBLOCKTAB_OPEN",

  /* Constants from the-graph-diamond added here */

  GATENODE_CHANGEPOSITION: "GATENODE_CHANGEPOSITION",
  DRAGGED_ELEMENTID: "DRAGGED_ELEMENTID",
  DRAGGED_ELEMENT: "DRAGGED_ELEMENT",
  CHANGE_NODEPOSITION: "CHANGE_NODEPOSITION",

  SELECT_NODE: "SELECT_NODE",
  DESELECT_ALLNODES: "DESELECT_ALLNODES",
  SELECT_EDGE: "SELECT_EDGE",
  DESELECT_ALLEDGES: "DESELECT_ALLEDGES",
  //CHANGE_GATE1STYLING: "CHANGE_GATE1STYLING"
  CHANGE_GRAPHPOSITION: "CHANGE_GRAPHPOSITION",
  GRAPH_ZOOM: "GRAPH_ZOOM",
  PUSH_NODETOARRAY: "PUSH_NODETOARRAY",
  PUSH_EDGETOARRAY: "PUSH_EDGETOARRAY",
  GETANY_EDGESELECTEDSTATE: "GETANY_EDGESELECTEDSTATE",
  CLICKED_EDGE: "CLICKED_EDGE",

  ADDTO_ALLNODEINFO: "ADDTO_ALLNODEINFO",
  FETCHINITIAL_NODEDATA: "FETCHINITIAL_NODEDATA",
  OPEN_NODETAB: "OPEN_NODETAB",
  REMOVE_NODETAB: "REMOVE_NODETAB",
  ADDEDGE_TOALLNODEINFO: "ADDEDGE_TOALLNODEINFO",
  PASS_PORTMOUSEDOWN: "PASS_PORTMOUSEDOWN",
  DESELECT_ALLPORTS: "DESELECT_ALLPORTS",
  STORING_FIRSTPORTCLICKED: "STORING_FIRSTPORTCLICKED",
  ADD_ONESINGLEEDGE: "ADD_ONESINGLEEDGE",
  CREATENEW_EDGELABEL: "CREATENEW_EDGELABEL",
  ADD_ONESINGLEEDGETOALLNODEINFO: "ADD_ONESINGLEEDGETOALLNODEINFO",
  ADD_ONESINGLEEDGETOEDGESOBJECT: "ADD_ONESINGLEEDGETOEDGESOBJECT",
  APPEND_EDGESELECTEDSTATE: "APPEND_EDGESELECTEDSTATE",
  PORT_MOUSEOVERLEAVETOGGLE: "PORT_MOUSEOVERLEAVETOGGLE",
  INTERACTJS_DRAG: "INTERACTJS_DRAG",

  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  WINDOWWIDTH_MEDIAQUERYCHANGED: "WINDOWWIDTH_MEDIAQUERYCHANGED"
};

module.exports = appConstants;
