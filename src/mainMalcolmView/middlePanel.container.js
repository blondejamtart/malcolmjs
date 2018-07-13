import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import Layout from '../layout/layout.component';
import TableContainer from '../malcolmWidgets/table/table.container';
import AttributeAlarm, {
  AlarmStates,
} from '../malcolmWidgets/attributeDetails/attributeAlarm/attributeAlarm.component';
import blockUtils from '../malcolm/blockUtils';

import malcolmLogo from '../malcolm-logo.png';
import navigationActions from '../malcolm/actions/navigation.actions';

const divBackground = 'rgb(48, 48, 48)';

const styles = () => ({
  container: {
    marginTop: 64,
    height: '100%',
    width: '100%',
  },
  layoutArea: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 64px)',
    backgroundColor: divBackground,
    backgroundImage:
      'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
    backgroundSize: '50px 50px',
  },
  alarm: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
  },
  alarmText: {
    marginRight: 5,
  },
  paletteButton: {
    position: 'absolute',
  },
  tableContainer: {
    display: 'flex',
    position: 'absolute',
    height: 'calc(100vh - 64px)',
    align: 'center',
    verticalAlign: 'middle',
  },
  plainBackground: {
    display: 'flex',
    width: '100%',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: divBackground,
    align: 'center',
  },
});

const getWidgetType = tags => {
  const widgetTagIndex = tags.findIndex(t => t.indexOf('widget:') !== -1);
  if (widgetTagIndex !== -1) {
    return tags[widgetTagIndex];
  }
  return -1;
};

const findAttributeComponent = props => {
  const widgetTag = getWidgetType(props.tags);
  switch (widgetTag) {
    case 'widget:flowgraph':
      return (
        <div className={props.classes.layoutArea}>
          <Layout />
          <div
            className={props.classes.alarm}
            style={{ left: props.openParent ? 360 + 29 : 29, bottom: 12 }}
          >
            <AttributeAlarm alarmSeverity={props.mainAttributeAlarmState} />
          </div>
          <div
            className={props.classes.paletteButton}
            style={{ right: props.openChild ? 360 + 29 : 29, bottom: 12 }}
          >
            <Button
              variant="fab"
              color="secondary"
              onClick={() => props.openPalette()}
            >
              <AddIcon />
            </Button>
          </div>
        </div>
      );
    case 'widget:table':
      return (
        <div className={props.classes.plainBackground}>
          <div
            className={props.classes.tableContainer}
            style={{
              left: props.openParent ? 365 : 5,
              width: `calc(100% - ${(props.openChild ? 365 : 5) +
                (props.openParent ? 365 : 5)}px)`,
              transition: 'width 1s, left 1s',
            }}
          >
            <TableContainer
              attributeName={props.mainAttribute}
              blockName={props.parentBlock}
              footerItems={[
                <AttributeAlarm
                  alarmSeverity={props.mainAttributeAlarmState}
                />,
              ]}
            />
          </div>
        </div>
      );
    default:
      return (
        <div className={props.classes.plainBackground}>
          <div
            className={props.classes.tablesContainer}
            style={{
              left: props.openParent ? 365 : 5,
              width: `calc(100% - ${(props.openChild ? 365 : 5) +
                (props.openParent ? 365 : 5)}px)`,
              transition: 'width 1s, left 1s',
            }}
          >
            <br />
            <br />
            <br />
            <img src={malcolmLogo} alt=" " />
          </div>
        </div>
      );
  }
};

const MiddlePanelContainer = props => (
  <div className={props.classes.container} role="presentation">
    {findAttributeComponent(props)}
  </div>
);

const mapStateToProps = state => {
  const attribute = blockUtils.findAttribute(
    state.malcolm.blocks,
    state.malcolm.parentBlock,
    state.malcolm.mainAttribute
  );

  let alarm = AlarmStates.PENDING;

  if (attribute && attribute.raw.alarm) {
    alarm = attribute.raw.alarm.severity;
    alarm = attribute.calculated.errorState ? AlarmStates.MAJOR_ALARM : alarm;
    alarm = attribute.calculated.pending ? AlarmStates.PENDING : alarm;
  }
  return {
    parentBlock: state.malcolm.parentBlock,
    mainAttribute: state.malcolm.mainAttribute,
    mainAttributeAlarmState: alarm,
    openParent: state.viewState.openParentPanel,
    openChild: state.malcolm.childBlock !== undefined,
    tags: attribute && attribute.raw.meta ? attribute.raw.meta.tags : [],
  };
};

const mapDispatchToProps = dispatch => ({
  openPalette: () => dispatch(navigationActions.navigateToPalette()),
});

findAttributeComponent.propTypes = {
  mainAttribute: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  mainAttributeAlarmState: PropTypes.number.isRequired,
  openParent: PropTypes.bool.isRequired,
  openChild: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    layoutArea: PropTypes.string,
    alarm: PropTypes.string,
    alarmText: PropTypes.string,
    tableContainer: PropTypes.string,
    plainBackground: PropTypes.string,
  }).isRequired,
  openPalette: PropTypes.func.isRequired,
};

MiddlePanelContainer.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MiddlePanelContainer)
);
