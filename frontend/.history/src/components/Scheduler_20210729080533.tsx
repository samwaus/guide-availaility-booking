import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from './sampleData';

export default class Demo extends React.PureComponent {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  // @ts-ignore
  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      // @ts-ignore
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        // @ts-ignore
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        // @ts-ignore
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    // @ts-ignore
    const { currentDate, data } = this.state;

    return (
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState currentDate={currentDate} />
          <EditingState onCommitChanges={this.commitChanges} />
          <IntegratedEditing />
          <DayView startDayHour={9} endDayHour={19} />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}
