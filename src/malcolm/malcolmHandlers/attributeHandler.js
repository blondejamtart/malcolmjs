import { MalcolmAttributeData } from '../malcolm.types';
import LayoutHandler from './layoutHandler';
import { buildMethodUpdate } from '../actions/method.actions';
import navigationActions from '../actions/navigation.actions';

const processDeltaMessage = (changes, oldObject) => {
  let object = oldObject;
  changes.forEach(change => {
    const pathWithinObj = change[0];
    if (pathWithinObj.length !== 0) {
      let update = object;
      pathWithinObj.slice(0, -1).forEach(element => {
        update = Object.prototype.hasOwnProperty.call(update, element)
          ? update[element]
          : {};
      });
      if (change.length === 1) {
        delete update[pathWithinObj.slice(-1)[0]];
      } else {
        // eslint-disable-next-line prefer-destructuring
        update[pathWithinObj.slice(-1)[0]] = change[1];
      }
    } else if (change.length === 2) {
      object = { ...change[1] };
    }
  });
  return object;
};

const processAttribute = (request, changedAttribute, getState, dispatch) => {
  const inGroup = changedAttribute.meta.tags.some(
    t => t.indexOf('group:') > -1
  );
  const group = inGroup
    ? changedAttribute.meta.tags
        .find(t => t.indexOf('group:') > -1)
        .replace('group:', '')
    : '';

  // #refactorDuplication
  const action = {
    type: MalcolmAttributeData,
    payload: {
      ...changedAttribute,
      id: request.id,
      /*
        isGroup: changedAttribute.meta.tags.some(t => t === 'widget:group'),
        inGroup,
        group, */
      typeid: changedAttribute.typeid,
      delta: true,
      raw: { ...changedAttribute },
      calculated: {
        isGroup: changedAttribute.meta.tags.some(t => t === 'widget:group'),
        inGroup,
        group,
        id: request.id,
      },
    },
  };

  dispatch(action);
  dispatch(navigationActions.subscribeToNewBlocksInRoute());

  if (changedAttribute.meta.tags.some(t => t === 'widget:flowgraph')) {
    LayoutHandler.layoutAttributeReceived(request.path, getState, dispatch);
  }
};

const processMethod = (request, method, dispatch) => {
  const changedMethod = {
    typeid: method.typeid,
    raw: { ...method },
  };

  dispatch(buildMethodUpdate(request.id, changedMethod));
};

export default {
  processAttribute,
  processMethod,
  processDeltaMessage,
};
