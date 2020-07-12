import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import cuid from 'cuid'
import { connect } from 'react-redux'

import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'
import { createEvent, updateEvent, deleteEvent } from '../eventActions'

class EventDashboard extends Component {
	state = {
		isOpen: false,
		selectedEvent: null,
	}

	// handleIsOpenToggle = () => {
	// 	// this.setState((prevState) => ({
	// 	// 	isOpen: !prevState.isOpen,
	// 	// }))
	// 	this.setState(({ isOpen }) => ({
	// 		isOpen: !isOpen,
	// 	}))
	// }

	handleCreateFormOpen = () => {
		this.setState({
			isOpen: true,
			selectedEvent: null,
		})
	}

	handleFormCancel = () => {
		this.setState({
			isOpen: false,
		})
	}

	handleCreateEvent = (newEvent) => {
		newEvent.id = cuid()
		newEvent.hostPhotoURL = '/assets/user.png'
		this.props.createEvent(newEvent)
		this.setState(({ events }) => ({
			isOpen: false,
		}))
	}

	handleSelectEvent = (event) => {
		this.setState({
			selectedEvent: event,
			isOpen: true,
		})
	}

	handleDeleteEvent = (id) => {
		this.props.deleteEvent(id)
	}

	handleUpdateEvent = (updateEvent) => {
		this.props.updateEvent(updateEvent)
		this.setState({
			isOpen: false,
			selectedEvent: null,
		})
	}

	render() {
		const { isOpen, selectedEvent } = this.state
		const { events } = this.props

		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList
						events={events}
						selectEvent={this.handleSelectEvent}
						deleteEvent={this.handleDeleteEvent}
					/>
				</Grid.Column>
				<Grid.Column width={6}>
					<Button
						onClick={this.handleCreateFormOpen}
						positive
						content='Create Event'
					/>
					{isOpen && (
						<EventForm
							key={selectedEvent ? selectedEvent.id : 0}
							updateEvent={this.handleUpdateEvent}
							selectedEvent={selectedEvent}
							createEvent={this.handleCreateEvent}
							cancelFormOpen={this.handleFormCancel}
						/>
					)}
				</Grid.Column>
			</Grid>
		)
	}
}

const mapState = (state) => ({
	events: state.events,
})

const actions = {
	createEvent,
	updateEvent,
	deleteEvent,
}

export default connect(mapState, actions)(EventDashboard)
