/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';

import { Axis, Chart, LineSeries, niceTimeFormatByDay, Position, ScaleType, Settings, timeFormatter } from '../../src';
import { KIBANA_METRICS } from '../../src/utils/data_samples/test_dataset_kibana';
import { getChartRotationKnob } from '../utils/knobs';
import { SB_KNOBS_PANEL } from '../utils/storybook';

const dateFormatter = timeFormatter(niceTimeFormatByDay(1));

export const Example = () => (
  <Chart className="story-chart">
    <Settings rotation={getChartRotationKnob()} />
    <Axis id="bottom" position={Position.Bottom} showOverlappingTicks tickFormat={dateFormatter} />
    <Axis
      id="left"
      title={KIBANA_METRICS.metrics.kibana_os_load[0].metric.title}
      position={Position.Left}
      tickFormat={(d) => `${Number(d).toFixed(2)}%`}
    />
    <LineSeries
      id="lines"
      xScaleType={ScaleType.Ordinal}
      yScaleType={ScaleType.Linear}
      xAccessor={0}
      yAccessors={[1]}
      data={KIBANA_METRICS.metrics.kibana_os_load[0].data.slice(0, 5)}
    />
  </Chart>
);

// storybook configuration
Example.story = {
  parameters: {
    options: { selectedPanel: SB_KNOBS_PANEL },
  },
};