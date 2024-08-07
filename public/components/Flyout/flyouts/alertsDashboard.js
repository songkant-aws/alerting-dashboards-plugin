/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiFlexGroup, EuiSmallButtonIcon, EuiText, EuiFlexItem } from '@elastic/eui';
import AlertsDashboardFlyoutComponent from './components/AlertsDashboardFlyoutComponent';

const alertsDashboard = (payload) => {
  const { closeFlyout, trigger_name } = payload;
  return {
    flyoutProps: {
      'aria-labelledby': 'alertsDashboardFlyout',
      size: 'm',
      hideCloseButton: true,
      'data-test-subj': `alertsDashboardFlyout_${trigger_name}`,
    },
    headerProps: { hasBorder: true },
    header: (
      <EuiFlexGroup justifyContent="flexStart" alignItems="center">
        <EuiFlexItem className="eui-textTruncate">
          <EuiText
            className="eui-textTruncate"
            size={'s'}
            data-test-subj={`alertsDashboardFlyout_header_${trigger_name}`}
          >
            <h2>{`Alerts by ${trigger_name}`}</h2>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSmallButtonIcon
            data-test-subj={`alertsDashboardFlyout_closeButton_${trigger_name}`}
            iconType="cross"
            display="empty"
            iconSize="m"
            onClick={closeFlyout}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    ),
    footerProps: { style: { backgroundColor: '#F5F7FA' } },
    body: <AlertsDashboardFlyoutComponent {...payload} />,
  };
};

export default alertsDashboard;
