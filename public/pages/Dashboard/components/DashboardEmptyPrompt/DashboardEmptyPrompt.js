/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import PropTypes from 'prop-types';
import { EuiSmallButton, EuiSmallButtonEmpty, EuiEmptyPrompt, EuiText } from '@elastic/eui';

import { APP_PATH } from '../../../../utils/constants';
import { PLUGIN_NAME } from '../../../../../utils/constants';

const createMonitorText =
  'There are no existing alerts. Create a monitor to add triggers and actions. Once an alarm is triggered, the state will show in this table.';
const createTriggerText =
  'There are no existing alerts. Create a trigger to start alerting. Once an alarm is triggered, the state will show in this table.';
const editTriggerConditionsText =
  'There are no existing alerts. Adjust trigger conditions to start alerting. Once an alarm is triggered, the state will show in this table.';

const createMonitorButton = (
  <EuiSmallButton fill href={`${PLUGIN_NAME}#${APP_PATH.CREATE_MONITOR}`}>
    Create monitor
  </EuiSmallButton>
);
const editMonitorButton = (onCreateTrigger) => (
  <EuiSmallButtonEmpty onClick={onCreateTrigger}>Edit monitor</EuiSmallButtonEmpty>
);

const DashboardEmptyPrompt = ({ onCreateTrigger, isModal = false }) => {
  const inMonitorDetails = typeof onCreateTrigger === 'function';
  const displayText = isModal
    ? editTriggerConditionsText
    : inMonitorDetails
    ? createTriggerText
    : createMonitorText;
  const actions = inMonitorDetails
    ? undefined
    : isModal
    ? editMonitorButton(onCreateTrigger)
    : createMonitorButton;
  return (
    <EuiEmptyPrompt
      style={{ maxWidth: '45em' }}
      body={
        <EuiText size="s">
          <p>{displayText}</p>
        </EuiText>
      }
      actions={actions}
    />
  );
};

DashboardEmptyPrompt.propTypes = {
  onCreateTrigger: PropTypes.func,
};

export default DashboardEmptyPrompt;
