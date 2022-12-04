import React, { Component } from 'react';
import { Header, Image, Icon, Divider, Table, Button, Segment, Dropdown, ButtonGroup } from 'semantic-ui-react'
import schedule_icon from '../media/Images/schedule_icon.png';
import ModalExampleCloseIcon from './ModalExampleCloseIcon' 
import '../stylesheets/Schedule.css';
import $ from 'jquery';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ScheduleComponent, Day, Week, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';

class Schedule extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      data: [],
      dataAll: [],

      //filter variables
      recurrence: 'Hide',
      once: 'Hide',

      //Creating New Variables
      subject: "",
      startDate: new Date(),
      endDate: new Date(),
      isRecurrent: '',

      isRecurrentOptions: [
        {
          key: 'FREQ=WEEKLY;INTERVAL=1;COUNT=1000',
          text: 'Recurrent',
          value: 'FREQ=WEEKLY;INTERVAL=1;COUNT=1000'
        },
        {
          key: 'Only Once',
          text: 'Only Once',
          value: 'Only Once'
        }
      ],
      id:0
    }

  }


  renameField(oldKey, newKey, object) {
    let str = JSON.stringify(object);
    str = str.replaceAll(oldKey, newKey);
    const objectNew = JSON.parse(str);
    return objectNew;
  }

  //Correct 
  correctScheduleDataFormat(array) {
    const newArray = []
    for (let i = 0; i < array.length; i++) {
      const x = this.renameField("start_time", "StartTime", array[i]);
      const y = this.renameField("end_time", "EndTime", x);
      if (y["recurrence_rule"]) {
        const z = this.renameField("recurrence_rule", "RecurrenceRule", y);
        newArray.push(z);
      } else {
        delete y["recurrence_rule"]
        newArray.push(y);
      }
    }
    return (newArray);
  }

  componentDidMount() {
    document.getElementById("create-appointment-form").hidden = true;
    document.getElementById("reschedule-appointment-form").hidden = true;
    document.getElementById("reschedule-remove-buttons").hidden = true;

    $.ajax({
      url: `/api/v1/schedules`,
      type: "GET",
      success: (result) => {
        const data = this.correctScheduleDataFormat(result.data);
        this.setState({
          data: data,
          dataAll: data
        });
        return;
      },
      error: () => {
        alert('Unable to load the schedule of the chosen room. Please try your request again')
        return;
      }
    });
  }

  toggleRecurrenceButton = () => {
    if (this.state.recurrence === 'Hide') {
      this.setState({ recurrence: 'Show' }, async () => {
        this.setState({
          data: this.state.data.filter(d => !Boolean(d?.RecurrenceRule)
          )
        })
      })
    } else {
      this.setState({ recurrence: 'Hide' }, async () => {
        this.setState({
          data: this.state.data.concat(this.state.dataAll.filter(d => Boolean(d?.RecurrenceRule)
          ))
        })
      })
    }
  }

  toggleOnceButton = () => {
    if (this.state.once === 'Hide') {
      this.setState({ once: 'Show' }, async () => {
        this.setState({
          data: this.state.data.filter(d => Boolean(d?.RecurrenceRule)
          )
        })
      })
    } else {
      this.setState({ once: 'Hide' }, async () => {
        this.setState({
          data: this.state.data.concat(this.state.dataAll.filter(d => !Boolean(d?.RecurrenceRule)
          ))
        })
      })
    }
  }

  showCreateAppointment = () => {
    if (document.getElementById("create-appointment-form").hidden) {
      document.getElementById("create-appointment-form").hidden = false;
      document.getElementById("reschedule-appointment-form").hidden = true;
      document.getElementById("create-appointment-form").scrollIntoView();
    } else {
      document.getElementById("create-appointment-form").hidden = true;
      document.getElementById("reschedule-appointment-form").hidden = true;
      document.getElementById("schedule-actions").scrollIntoView();
    }
  }

  showRescheduleAppointment = () => {
    if (document.getElementById("reschedule-appointment-form").hidden) {
      document.getElementById("reschedule-appointment-form").hidden = false;
      document.getElementById("create-appointment-form").hidden = true;
      document.getElementById("reschedule-appointment-form").scrollIntoView();
    } else {
      document.getElementById("create-appointment-form").hidden = true;
      document.getElementById("reschedule-appointment-form").hidden = true;
      document.getElementById("schedule-actions").scrollIntoView();
    }
  }

  // New Appointment
  handleSubject = (event) => {
    this.setState({ subject: event.target.value })
  }

  handleStartDate = (event) => {
    this.setState({
      startDate: event.target.value
    });
  }

  handleEndDate = (event) => {
    this.setState({
      endDate: event.target.value
    });
  }

  handleIsRecurrent = (event, { value }) => {
    this.setState({ isRecurrent: value })
  }

  createNewAppointment = (event) => {
    event.preventDefault();
    $.ajax({
      url: `/api/v1/schedules`,
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        subject: this.state.subject,
        start_time: this.state.startDate,
        end_time: this.state.endDate,
        recurrence_rule: this.state.isRecurrent
      }),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (result) => {
        document.getElementById("create-appointment-form").hidden = true;
        document.getElementById("reschedule-appointment-form").hidden = true;
        document.getElementById("reschedule-remove-buttons").hidden = true;
        this.setState({
          dataAll: this.correctScheduleDataFormat(this.state.dataAll.concat(result.data)),
          recurrence: 'Hide',
          once: 'Hide',
          data: this.correctScheduleDataFormat(this.state.dataAll.concat(result.data))
        })
      },
      error: (error) => {
        alert('Unable to create a class. Please try again later')
        return;
      }
    })

  }

  rescheduleAppointment = (event) => {
    event.preventDefault();
    $.ajax({
      url: `/api/v1/schedules/${this.state.id}`,
      type: "PUT",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        subject: this.state.subject,
        start_time: this.state.startDate,
        end_time: this.state.endDate,
        recurrence_rule: this.state.isRecurrent
      }),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (result) => {
        document.getElementById("create-appointment-form").hidden = true;
        document.getElementById("reschedule-appointment-form").hidden = true;
        document.getElementById("reschedule-remove-buttons").hidden = true;
        this.setState({
            data: this.state.data.filter(d => !Boolean(d?.id===this.state.id)),
            dataAll: this.state.dataAll.filter(d => !Boolean(d?.id===this.state.id))
          }, async ()=> this.setState({
            dataAll: this.correctScheduleDataFormat(this.state.dataAll.concat(result.data)),
            recurrence: 'Hide',
            once: 'Hide',
            data: this.correctScheduleDataFormat(this.state.dataAll.concat(result.data))
          })
        )
      },
      error: (error) => {
        alert('Unable to create a class. Please try again later')
        return;
      }
    })

  }

  deleteSchedule = () => {
    $.ajax({
      url: `/api/v1/schedules/${this.state.id}`,
      type: "DELETE",
      // dataType: 'json',
      // contentType: 'application/json',
      // data: JSON.stringify({
      //   subject: this.state.subject,
      //   start_time: this.state.startDate,
      //   end_time: this.state.endDate,
      //   recurrence_rule: this.state.isRecurrent
      // }),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: () => {
        document.getElementById("create-appointment-form").hidden = true;
        document.getElementById("reschedule-appointment-form").hidden = true;
        document.getElementById("reschedule-remove-buttons").hidden = true;
        this.setState({
          data: this.state.data.filter(d => !Boolean(d?.id===this.state.id)),
          dataAll: this.state.dataAll.filter(d => !Boolean(d?.id===this.state.id))
        })
      },
      error: (error) => {
        alert('Unable to completely cancel the Class. Please try again later')
        return;
      }
    })
  }

  //  eventTemplate
  eventTemplate(props) {
    if (props.RecurrenceRule) {
      return (
        <div id={"recurrence"}>
          {props.subject}
          <br></br>
          Recurrent
        </div>
      )

    } else {
      return (
        <div id={"once"}>
          {props.subject}
        </div>
      )

    }
  }
  
  onPopupOpen(args) {
    args.cancel = true;
    if (typeof args.data?.id !== 'undefined') {
      document.getElementById("reschedule-remove-buttons").hidden = false;
      document.getElementById("reschedule-remove-buttons").scrollIntoView();
      this.setState({
        id: args.data.id
      })
    } else{
      document.getElementById("reschedule-remove-buttons").hidden = true;
      this.setState({
        id: 0
      });
    }
  }

  render() {
    return (
      <>
        <div id='header'>
          <Header id='sub-header' as='h2' block={true} value={0}>
            <Image size='large' circular src={schedule_icon} /> Schedule
          </Header>
        </div>
        <Divider horizontal />

        <ScheduleComponent id='schedule-component' width='100%' showHeaderBar={false} height='550px' currentView='Week' firstDayOfWeek={6} startHour='12:00' endHour='00:00'
          eventSettings={{ dataSource: this.state.data, template: this.eventTemplate.bind(this) }}
          popupOpen={(this.onPopupOpen.bind(this))} >
          <ViewsDirective id='here'>
            <ViewDirective option='Week' timeScale={{ enable: true, slotCount: 3 }} allowVirtualScrolling={false} headerRows='hour' />
          </ViewsDirective>
          <Inject services={[Day, Week]} />
        </ScheduleComponent>
        <Divider horizontal />



        {/*Start Actions*/}
        <div id='schedule-actions'>
          <Divider horizontal>
            <h4>
              <Icon name='calendar' />
              Actions
            </h4>
          </Divider>
          <Table definition color='blue'>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={4}> <Icon name='hide' /> <Icon name='unhide' /> Filters</Table.Cell>
                <Table.Cell>
                  <Button id='recurrence-filter' size='mini' onClick={this.toggleRecurrenceButton}> {this.state.recurrence} Recurrent Events </Button>
                  <Button id='once-filter' size='mini' onClick={this.toggleOnceButton}> {this.state.once} None-recurrent Events </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={4}>Add New Class</Table.Cell>
                <Table.Cell>
                  <Button id='create-appointment' size='mini' color='red' onClick={this.showCreateAppointment}> Create New Appointment </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

        </div>
        {/*End Actions*/}

        {/*Start of Adding Appointment Form*/}
        <div id='create-appointment-div'>
          <Segment id="create-appointment-form" >
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}> Subject</Table.Cell>
                  <Table.Cell>
                    <input className='input' placeholder='Description' onChange={this.handleSubject} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}> Start</Table.Cell>
                  <Table.Cell>
                    <DateTimePickerComponent
                      CssClass="customClass"
                      id='StartTime'
                      className="e-field"
                      format='dd/MM/yy hh:mm a'
                      value={this.state.startDate}
                      onChange={this.handleStartDate}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}> End</Table.Cell>
                  <Table.Cell>
                    <DateTimePickerComponent
                      CssClass="customClass"
                      id='StartTime'
                      className="e-field"
                      format='dd/MM/yy hh:mm a'
                      value={this.state.endDate}
                      onChange={this.handleEndDate}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}> Is Recurrent?</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      className='Dropdown'
                      placeholder='Is Recurrent?'
                      selection
                      options={this.state.isRecurrentOptions}
                      onChange={this.handleIsRecurrent}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button id='submit-create-appointment' floated='right' type='submit' onClick={this.createNewAppointment}>Submit</Button>
          </Segment>
        </div>
        {/*End of Adding Appointment Form*/}

        {/*Start of Reschedule Class Form*/}
        <div id='reschedule-appointment-div'>
          <Segment id="reschedule-appointment-form">
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}> Subject</Table.Cell>
                  <Table.Cell>
                    <input className='input' placeholder='Description' onChange={this.handleSubject} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}> Start</Table.Cell>
                  <Table.Cell>
                    <DateTimePickerComponent
                      CssClass="customClass"
                      id='StartTime'
                      className="e-field"
                      format='dd/MM/yy hh:mm a'
                      value={this.state.startDate}
                      onChange={this.handleStartDate}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}> End</Table.Cell>
                  <Table.Cell>
                    <DateTimePickerComponent
                      CssClass="customClass"
                      id='StartTime'
                      className="e-field"
                      format='dd/MM/yy hh:mm a'
                      value={this.state.endDate}
                      onChange={this.handleEndDate}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}> Is Recurrent?</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      className='Dropdown'
                      placeholder='Is Recurrent?'
                      selection
                      options={this.state.isRecurrentOptions}
                      onChange={this.handleIsRecurrent}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button id='submit-reschedule-appointment' floated='right' type='submit' onClick={this.rescheduleAppointment}>Submit</Button>
          </Segment>
        </div>
        {/*End of Reschedule Class Form*/}

        <div id='reschedule-remove-buttons' >
          <ButtonGroup>
            <div className='button-div'>
              <button id='reschedule-button' onClick={this.showRescheduleAppointment}> Reschedule </button>
            </div>

            <div className='button-div'>
              <ModalExampleCloseIcon deleteSchedule={this.deleteSchedule.bind(this)}/>
            </div>
          </ButtonGroup>
        </div>


      </>
    );
  }

}

export default Schedule;