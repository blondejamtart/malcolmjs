/* eslint react/no-array-index-key: 0 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import CircularBuffer from 'circular-buffer';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/dist/locale/en';
// below is for updated version of json editor
// import locale from 'react-json-editor-ajrm/locale/en';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
// import Typography from '@material-ui/core/Typography';
// import ButtonAction from '../buttonAction/buttonAction.component';
import WidgetTable from '../table/table.component';

import blockUtils from '../../malcolm/blockUtils';
import { malcolmUpdateMethodInput } from '../../malcolm/actions/method.actions';

const noOp = () => {};

const MethodViewer = props => {
  const transitionWithPanelStyle = {
    left: props.openParent ? 360 : 0,
    width: `calc(100% - ${(props.openChild ? 360 : 0) +
      (props.openParent ? 360 : 0)}px)`,
    // transition: 'width 1s, left 1s',
  };
  if (props.method && props.selectedParam) {
    const widgetTag = props.selectedParamMeta.tags.find(
      t => t.indexOf('widget:') !== -1
    );
    // const { localStorage } = window;
    const footerItems = [
      ...props.footerItems /*
      <ButtonAction
        text="Save to cookie"
        clickAction={() => {
          localStorage.setItem(
            `${props.blockName},${props.attributeName}.${props.selectedParam}`,
            JSON.stringify(props.selectedParamValue)
          );
        }}
      />,
      <ButtonAction
        text="Load from cookie"
        clickAction={() => {
          const savedJSONString = localStorage.getItem(
            `${props.blockName},${props.attributeName}.${props.selectedParam}`
          );
          const savedVal = JSON.parse(savedJSONString);
          props.updateInput(
            props.method.calculated.path,
            props.selectedParam[1],
            savedVal
          );
        }}
      />, */,
    ];
    switch (widgetTag) {
      case 'widget:tree':
        return (
          <div className={props.classes.plainBackground}>
            <div
              className={props.classes.tableContainer}
              style={{
                ...transitionWithPanelStyle,
                textAlign: 'left',
                display: 'initial',
              }}
            >
              <div style={{ height: 'calc(100% - 56px)' }}>
                <JSONInput
                  locale={locale}
                  placeholder={props.selectedParamValue}
                  onChange={val => {
                    if (!val.error) {
                      props.updateInput(
                        props.method.calculated.path,
                        props.selectedParam[1],
                        val.jsObject
                      );
                    }
                  }}
                  id={props.selectedParam}
                  height="100%"
                  width="100%"
                  style={{ body: { fontSize: '150%' } }}
                />
              </div>
              <Table>
                <TableFooter>
                  <TableRow>
                    {footerItems.map((item, key) => (
                      <TableCell key={key}>{item}</TableCell>
                    ))}
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        );
      default:
        return <div className={props.classes.plainBackground} />;
    }
  } else if (props.method && props.methodArchive) {
    const timeStamps = props.methodArchive.timeStamp.toarray();
    const values = props.methodArchive.value.toarray();
    const copyRunParams = row => {
      const params = values[row].runParameters;
      Object.keys(params).forEach(paramName => {
        props.updateInput(
          props.method.calculated.path,
          paramName,
          params[paramName]
        );
      });
    };
    return (
      <div className={props.classes.plainBackground}>
        <div
          className={props.classes.tableContainer}
          style={{
            ...transitionWithPanelStyle,
            textAlign: 'left',
            display: 'initial',
          }}
        >
          <WidgetTable
            attribute={{
              raw: {
                value: {
                  postTime: timeStamps.map(stamp => stamp.localRunTime),
                  returnTime: timeStamps.map(stamp => stamp.localReturnTime),
                  returnStatus: values.map(value => value.returnStatus),
                  alarm: timeStamps.map(() => ''),
                  copyParams: timeStamps.map(() => ({
                    label: 'Copy',
                    action: path => {
                      copyRunParams(path.row);
                    },
                  })),
                },
                meta: {
                  elements: {
                    alarm: {
                      tags: ['info:alarm'],
                      label: 'Alarm state',
                    },
                    postTime: {
                      tags: ['widget:textupdate'],
                      label: 'Time run',
                    },
                    returnTime: {
                      tags: ['widget:textupdate'],
                      label: 'Time results received',
                    },
                    returnStatus: {
                      tags: ['widget:textupdate'],
                      label: 'Return Status',
                    },
                    copyParams: {
                      tags: ['info:button'],
                      label: 'Reuse run params',
                    },
                  },
                },
              },
              calculated: {},
            }}
            hideInfo
            eventHandler={noOp}
            setFlag={noOp}
            addRow={noOp}
            infoClickHandler={noOp}
            rowClickHandler={noOp}
          />
        </div>
      </div>
    );
  }

  return <div>oops!</div>;
};

const mapStateToProps = (state, ownProps) => {
  let methodIndex;
  let method;
  let methodArchive;
  let selectedParamMeta;
  let selectedParamValue;
  if (ownProps.attributeName && ownProps.blockName) {
    methodIndex = blockUtils.findAttributeIndex(
      state.malcolm.blocks,
      ownProps.blockName,
      ownProps.attributeName
    );
  }
  const selectedParam = ownProps.subElement;
  if (methodIndex > -1) {
    method = state.malcolm.blocks[ownProps.blockName].attributes[methodIndex];
    methodArchive =
      state.malcolm.blockArchive[ownProps.blockName].attributes[methodIndex];
  }
  if (method && selectedParam) {
    selectedParamMeta = method.raw[selectedParam[0]].elements[selectedParam[1]];
    let ioType;
    if (selectedParam[0] === 'takes') {
      ioType = 'inputs';
    } else if (selectedParam[0] === 'returns') {
      ioType = 'outputs';
    }
    selectedParamValue = method.calculated[ioType]
      ? method.calculated[ioType][selectedParam[1]]
      : null;
  }
  return {
    method,
    methodArchive,
    selectedParam,
    selectedParamMeta,
    selectedParamValue,
  };
};

const mapDispatchToProps = dispatch => ({
  updateInput: (path, inputName, inputValue) => {
    dispatch(malcolmUpdateMethodInput(path, inputName, inputValue));
  },
});

MethodViewer.propTypes = {
  // blockName: PropTypes.string.isRequired,
  // attributeName: PropTypes.string.isRequired,
  method: PropTypes.shape({
    calculated: PropTypes.shape({
      path: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    raw: PropTypes.shape({
      timeStamp: PropTypes.shape({
        secondsPastEpoch: PropTypes.string,
      }),
    }),
  }).isRequired,
  methodArchive: PropTypes.shape({
    timeStamp: PropTypes.instanceOf(CircularBuffer),
    value: PropTypes.instanceOf(CircularBuffer),
  }).isRequired,
  selectedParamMeta: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  selectedParamValue: PropTypes.oneOf(
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ).isRequired,
  classes: PropTypes.shape({
    plainBackground: PropTypes.string,
    tableContainer: PropTypes.string,
  }).isRequired,
  footerItems: PropTypes.arrayOf(PropTypes.node),
  selectedParam: PropTypes.arrayOf(PropTypes.string).isRequired,
  openParent: PropTypes.bool.isRequired,
  openChild: PropTypes.bool.isRequired,
  updateInput: PropTypes.func.isRequired,
};

MethodViewer.defaultProps = {
  footerItems: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withTheme()(MethodViewer)
);
