import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from './sampleData';

const currentDate = '2018-06-27';

const Schduler = () => (
  <Paper>
    <Scheduler data={appointments} height={660}>
      <ViewState defaultCurrentDate={currentDate} />
      <WeekView startDayHour={9} endDayHour={19} />
      <Appointments />
      <AllDayPanel />
    </Scheduler>
  </Paper>
);

export default Schduler;
