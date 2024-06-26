/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import _ from 'lodash';
import { MDSEnabledClientService } from './MDSEnabledClientService';

export const GET_ALERTS_SORT_FILTERS = {
  MONITOR_NAME: 'monitor_name',
  TRIGGER_NAME: 'trigger_name',
  START_TIME: 'start_time',
  END_TIME: 'end_time',
  ACKNOWLEDGE_TIME: 'acknowledged_time',
};

export default class AlertService extends MDSEnabledClientService {
  getAlerts = async (context, req, res) => {
    const {
      from = 0,
      size = 20,
      search = '',
      sortDirection = 'desc',
      sortField = GET_ALERTS_SORT_FILTERS.START_TIME,
      severityLevel = 'ALL',
      alertState = 'ALL',
      monitorIds = [],
      monitorType = 'monitor',
    } = req.query;

    var params;
    switch (sortField) {
      case GET_ALERTS_SORT_FILTERS.MONITOR_NAME:
        params = {
          sortString: `${sortField}.keyword`,
          sortOrder: sortDirection,
        };
        break;
      case GET_ALERTS_SORT_FILTERS.TRIGGER_NAME:
        params = {
          sortString: `${sortField}.keyword`,
          sortOrder: sortDirection,
        };
        break;
      case GET_ALERTS_SORT_FILTERS.END_TIME:
        params = {
          sortString: sortField,
          sortOrder: sortDirection,
          missing: sortDirection === 'asc' ? '_last' : '_first',
        };
        break;
      case GET_ALERTS_SORT_FILTERS.ACKNOWLEDGE_TIME:
        params = {
          sortString: sortField,
          sortOrder: sortDirection,
          missing: '_last',
        };
        break;
      default:
        // If the sortField parsed from the URL isn't a valid option for this API, use a default option.
        params = {
          sortString: GET_ALERTS_SORT_FILTERS.START_TIME,
          sortOrder: sortDirection,
        };
    }

    params.startIndex = from;
    params.size = size;
    params.severityLevel = severityLevel;
    params.alertState = alertState;
    params.searchString = search;
    if (search.trim()) params.searchString = `*${search.trim().split(' ').join('* *')}*`;
    if (monitorIds.length > 0) {
      const idField = monitorType === 'composite' ? 'workflowIds' : 'monitorId';
      params[idField] = !Array.isArray(monitorIds) ? monitorIds : monitorIds[0];
    }

    const client = this.getClientBasedOnDataSource(context, req);
    try {
      const resp = await client('alerting.getAlerts', params);
      const alerts = resp.alerts.map((hit) => {
        const alert = hit;
        const id = hit.alert_id;
        const version = hit.alert_version;
        return {
          id,
          ...alert,
          version,
          alert_source: !!alert.workflow_id ? 'workflow' : 'monitor',
        };
      });
      const totalAlerts = resp.totalAlerts;

      return res.ok({
        body: {
          ok: true,
          alerts,
          totalAlerts,
        },
      });
    } catch (err) {
      console.error(err.message);
      return res.ok({
        body: {
          ok: false,
          err: err.message,
        },
      });
    }
  };

  getWorkflowAlerts = async (context, req, res) => {
    const client = this.getClientBasedOnDataSource(context, req);
    try {
      const resp = await client('alerting.getWorkflowAlerts', req.query);

      return res.ok({
        body: {
          ok: true,
          resp,
        },
      });
    } catch (err) {
      console.error(err.message);
      return res.ok({
        body: {
          ok: false,
          err: err.message,
        },
      });
    }
  };
}
