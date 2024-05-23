/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const initializeFromQueryParams = (queryParams) => {
  return {
    searchType: queryParams.searchType || undefined,
    name: queryParams.name ? `${queryParams.name}-Monitor` : undefined,
    detectorId: queryParams.adId || undefined,
    period:
      queryParams.interval && queryParams.unit
        ? { interval: parseInt(queryParams.interval), unit: queryParams.unit }
        : undefined,
    adResultIndex: queryParams.adResultIndex || undefined,

    // new prototype fields are starting as here
    index: queryParams.index ? [{ label: queryParams.index }] : undefined,
    timeField: queryParams.timefield || undefined,
    monitor_type: queryParams.monitor_type || undefined,
    frequency: queryParams.frequency || undefined,
    timezone: queryParams.timezone || undefined,
    daily: queryParams.daily || undefined,
    weekly_mon: queryParams.weekly_mon || undefined,
    weekly_tue: queryParams.weekly_tue || undefined,
    weekly_wed: queryParams.weekly_wed || undefined,
    weekly_thur: queryParams.weekly_thur || undefined,
    weekly_fri: queryParams.weekly_fri || undefined,
    weekly_sat: queryParams.weekly_sat || undefined,
    weekly_sun: queryParams.weekly_sun || undefined,
    monthly_type: queryParams.monthly_type || undefined,
    monthly_day: queryParams.monthly_day || undefined,
    aggregationType: queryParams.aggregationType || undefined,
    aggregationField: queryParams.aggregationField || undefined,
    groupBy: queryParams.groupByField ? [queryParams.groupByField] : undefined,
    filters:
      queryParams.filterField &&
      queryParams.filterFieldType &&
      queryParams.filterOperator &&
      queryParams.filterValue
        ? [
            {
              fieldName: [{ label: queryParams.filterField, type: queryParams.filterFieldType }],
              fieldValue: queryParams.filterValue,
              operator: queryParams.filterOperator,
            },
          ]
        : undefined,
    trigger_name: queryParams.trigger_name || undefined,
    trigger_severity: queryParams.trigger_severity || undefined,
    thresholdEnum: queryParams.trigger_threshold_enum || undefined,
    thresholdValue: queryParams.trigger_threshold || undefined,
  };
};
