import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import '../stylesheets/ModalExampleCloseIcon.css';
function ModalExampleCloseIcon(props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal closeIcon
      open={open}
      trigger={<button id='remove-button'> Remove </button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='warning sign' content='Remove Appointment' />
      <Modal.Content>
        <p>
          Are you sure you want to remove the appoint?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' onClick={() => {setOpen(false);
        props.deleteSchedule();}}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleCloseIcon