import React from 'react';
import { connect } from 'react-redux';
import blockUtils from '../malcolm/blockUtils';

const ConnectedDiv = props => (
  <div className={props.className}>
    {JSON.stringify(props.attribute)}
  </div>
);

const mapStateToProps = (state, ownProps) => {
  return ({
    attribute: blockUtils.findAttribute(state.malcolm.blocks, ownProps.block, ownProps.attribute),
  }) ;
};

export default connect(mapStateToProps)(ConnectedDiv)