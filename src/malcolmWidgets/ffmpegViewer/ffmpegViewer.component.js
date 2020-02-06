import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import blockUtils from '../../malcolm/blockUtils';

const FFmpegViewer = props => (
  <img
    src={props.attribute.raw.value}
    alt="no frames received"
    width="100%"
    height="auto"
    style={{ objectFit: 'contain' }}
  />
);

const mapStateToProps = (state, ownProps) => {
  const attribute = blockUtils.findAttribute(
    state.malcolm.blocks,
    ownProps.blockName,
    ownProps.attributeName
  );

  return {
    attribute,
  };
};

FFmpegViewer.propTypes = {
  attribute: PropTypes.shape({
    raw: PropTypes.shape({
      meta: PropTypes.shape({
        tags: PropTypes.arrayOf(PropTypes.string),
        choices: PropTypes.arrayOf(PropTypes.string),
        writeable: PropTypes.bool,
      }),
      path: PropTypes.arrayOf(PropTypes.string),
      value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
        PropTypes.shape({}),
      ]),
      pending: PropTypes.bool,
      errorState: PropTypes.bool,
      dirty: PropTypes.bool,
      alarm: PropTypes.shape({
        severity: PropTypes.number,
      }),
    }),
  }).isRequired,
};

export default connect(mapStateToProps)(withTheme()(FFmpegViewer));
