import React, {Component, useEffect, useState} from 'react';
import {Scheduler} from '@aldabil/react-scheduler'
import moment from 'moment'
import { DefaultRecourse, ProcessedEvent } from '@aldabil/react-scheduler/dist/types';
import { useLocalAppointmentActions } from '../../core/appointment';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/reducers';
import { Appointment, Principal } from '../../models';
import { Theme, useTheme } from '@mui/material/styles';

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

interface SchedulerCalendarProps {
  salesman: Principal
}

function SchedulerCalendar({salesman}: SchedulerCalendarProps) {
    const [events, setEvents] = useState<ProcessedEvent[]>([])   
    const {actions: appointmentActions } = useLocalAppointmentActions();  
    const model = useSelector((root: RootState) => root.appointment.searchModel)
    let myEvents: ProcessedEvent[] = []
    const theme: Theme = useTheme();

    // let schedulerData = new SchedulerData(moment().format(DATE_FORMAT), V    const model = useSelectot iewTypes.Week);
    // //set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).
    // moment.locale('it-IT');
    // schedulerData.setLocaleMoment(moment);
    // //set resources here or later
    // let resources = [
    //                         {
    //                   id: 'r0',
    //                   name: 'Resource0',
    //                   author: "X",
    //                   bgColor: 'red',
    //                   issue: '#1'
    //               },
    //               {
    //                   id: 'r1',
    //                   name: 'Resource1',
    //                   author: "X",
    //                   bgColor: '#D9D9D9',
    //                   issue: '#2'
    //               },
    //               {
    //                   id: 'r2',
    //                   name: 'Resource2',
    //                   author: "X",
    //                   issue: '#99'
    //               },
    //                 ];
    // schedulerData.setResources(resources);
    // //set events here or later,
    // //the event array should be sorted in ascending order by event.start property, otherwise there will be some rendering errors
    // let events = [
    //                   {
    //                       id: 1,
    //                       start: '2017-12-18 09:30:00',
    //                       end: '2017-12-19 23:30:00',
    //                       resourceId: 'r1',
    //                       title: 'I am finished',
    //                       label: 'QA Failed',
    //                       //img: 'https://miro.medium.com/fit/c/28/28/1*UJzclN5h-DYWjRyVqXThUw.png',
    //                       bgColor: '#D9D9D9',
    //                       showPopover: false
    //                   },
    //                   {
    //                       id: 2,
    //                       start: '2017-12-18 12:30:00',
    //                       end: '2017-12-26 23:30:00',
    //                       resourceId: 'r2',
    //                       title: 'I am not resizable',
    //                       label: 'Development',
    //                       resizable: false
    //                   },
    //                  {
    //                      id: 3,
    //                      start: '2017-12-19 12:30:00',
    //                      end: '2017-12-20 23:30:00',
    //                      resourceId: 'r3',
    //                      title: 'I am not movable',
    //                      movable: false
    //                  },
    //                  {
    //                      id: 4,
    //                      start: '2017-12-19 14:30:00',
    //                      end: '2017-12-20 23:30:00',
    //                      resourceId: 'r1',
    //                      title: 'I am not start-resizable',
    //                      startResizable: false
    //                  },
    //                  {
    //                      id: 5,
    //                      start: '2017-12-19 15:30:00',
    //                      end: '2017-12-20 23:30:00',
    //                      resourceId: 'r2',
    //                      title: 'R2 has recurring tasks every week on Tuesday, Friday',
    //                      rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
    //                      bgColor: '#f759ab'
    //                  }
    //              ];
    //schedulerData.setEvents(events);
    
    // useEffect(() => {
    //   console.log('salesmans in scheduler', salesmans)
    //   let myResources: DefaultRecourse[] = []
    //   salesmans.forEach(element => {
    //     myResources.push({text: element.surname, subtext: element.mobilePhone, admin_id: element.id, assignee: element.id, color: theme.palette.primary.main, avatar: element.name})
    //   });
    //   setResources(myResources)
    //   console.log('myResources length salesman', myResources)
    // }, [])


    useEffect(() => {
      //Fetch events
      console.log('change salesman  id', salesman.id)
      model.salesmanId = salesman.id;
      appointmentActions.search(model)
      .then((res: Appointment[]) => {
          console.log('end of search salesman', salesman.id)
          console.log('app salesman recuperati', res?.length)
          res.forEach(appoint => {
            console.log('salesman ciclo', appoint)
            myEvents.push({event_id: appoint.eventId, title: appoint.title, start: moment(appoint.dateFrom).toDate(), end: moment(appoint.dateTo).toDate()})
            console.log('evento salesman recuperato', myEvents?.length)
          });
          setEvents(myEvents);
      })
      .catch(() => { })
    }, [salesman])

    return (
        <>
          <div style={{flexGrow: 1}}>
            <h3 style={{textAlign: "center"}}>Calendario di {salesman.surname} - {salesman.name}</h3>                    
          </div>
          <Scheduler
              events={events}                    
              //resources={resources}
              resourceViewMode="default"
              view="week"
              week={{ 
                  weekDays: [0, 1, 2, 3, 4, 5], 
                  weekStartOn: 1, 
                  startHour: 9, 
                  endHour: 18,
                  step: 60
              }}
              selectedDate={moment().toDate()}                          
          />
        </>
    );
}

export default SchedulerCalendar;

// fields={[
//   {
//     name: "admin_id",
//     type: "select",
//     default: RESOURCES[0].admin_id,
//     options: RESOURCES.map((res) => {
//       return {
//         id: res.admin_id,
//         text: `${res.title} (${res.mobile})`,
//         value: res.admin_id //Should match "name" property
//       };
//     }),
//     config: { label: "Assignee", required: true }
//   }
// ]}
// viewerExtraComponent={(fields, event) => {
//   return (
//     <div>
//       {fields.map((field, i) => {
//         if (field.name === "admin_id") {
//           const admin = field.options.find(
//             (fe) => fe.id === event.admin_id
//           );
//           return (
//             <Typography
//               key={i}
//               style={{ display: "flex", alignItems: "center" }}
//               color="textSecondary"
//               variant="caption"
//               noWrap
//             >
//               <PersonRoundedIcon /> {admin.text}
//             </Typography>
//           );
//         } else {
//           return "";
//         }
//       })}
//     </div>
//   );
// }}
