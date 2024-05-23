/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import _ from 'lodash';
import { getDigitId, getUniqueName } from '../../../../utils/helpers';
import {
  FORMIK_COMPOSITE_INITIAL_TRIGGER_VALUES,
  FORMIK_INITIAL_TRIGGER_VALUES,
} from '../../containers/CreateTrigger/utils/constants';
import { getInitialActionValues } from '../AddActionButton/utils';
import { MONITOR_TYPE } from '../../../../utils/constants';

export const getInitialTriggerValues = ({
  script = FORMIK_INITIAL_TRIGGER_VALUES.script,
  flyoutMode,
  triggers,
  monitorType,
}) => {
  const initialValues =
    monitorType === MONITOR_TYPE.COMPOSITE_LEVEL
      ? _.cloneDeep(FORMIK_COMPOSITE_INITIAL_TRIGGER_VALUES)
      : _.cloneDeep({ ...FORMIK_INITIAL_TRIGGER_VALUES, script });

  if (flyoutMode) {
    const id = getDigitId();

    initialValues.id = `trigger${id}`;
    initialValues.name = getUniqueName(triggers, 'Trigger ');
    const initialAction = getInitialActionValues({ monitorType, flyoutMode, actions: [] });
    initialValues.actions = [initialAction];
  } else if (triggers.length) {
    const id = getDigitId();

    initialValues.id = `trigger${id}`;
    initialValues.name = getUniqueName(triggers, `${triggers[0].name} `);
    if (triggers[0].severity) {
      initialValues.severity = triggers[0].severity;
    }
    if (triggers[0].thresholdEnum) {
      initialValues.thresholdEnum = triggers[0].thresholdEnum;
    }
    if (triggers[0].thresholdValue) {
      initialValues.thresholdValue = triggers[0].thresholdValue;
    }
  }

  return initialValues;
};
