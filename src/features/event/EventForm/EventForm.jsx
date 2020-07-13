import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'

import { createEvent, updateEvent } from '../eventActions.js'
import cuid from 'cuid'
import TextInput from '../../../app/common/form/TextInput.jsx'
import TextArea from '../../../app/common/form/TextArea.jsx'
import SelectInput from '../../../app/common/form/SelectInput.jsx'

const category = [
	{ key: 'drinks', text: 'Drinks', value: 'drinks' },
	{ key: 'culture', text: 'Culture', value: 'culture' },
	{ key: 'film', text: 'Film', value: 'film' },
	{ key: 'food', text: 'Food', value: 'food' },
	{ key: 'music', text: 'Music', value: 'music' },
	{ key: 'travel', text: 'Travel', value: 'travel' },
]

class EventForm extends Component {
	handleFormSubmit = (event) => {
		event.preventDefault()
		if (this.state.id) {
			this.props.updateEvent(this.state)
			this.props.history.push(`/events/${this.state.id}`)
		} else {
			const newEvent = {
				...this.state,
				id: cuid(),
				hostPhotoURL: '/assets/user.png',
			}
			this.props.createEvent(newEvent)
			this.props.history.push(`/events`)
		}
	}

	handleInputChange = ({ target: { name, value } }) => {
		this.setState({
			// [event.target.name]: event.target.value,
			[name]: value,
		})
	}

	render() {
		return (
			<Grid>
				<Grid.Column width={10}>
					<Segment>
						<Header sub color='teal' content='Event Detail' />
						<Form onSubmit={this.handleFormSubmit} autoComplete='off'>
							<Field
								name='title'
								component={TextInput}
								placeholder='Give your event name'
							/>
							<Field
								name='category'
								component={SelectInput}
								options={category}
								placeholder='What is your event about?'
							/>{' '}
							<Field
								name='description'
								component={TextArea}
								row={3}
								placeholder='Tell us about your event'
							/>{' '}
							<Header sub color='teal' content='Event Location Detail' />
							<Field
								name='city'
								component={TextInput}
								placeholder='Event City'
							/>{' '}
							<Field
								name='venue'
								component={TextInput}
								placeholder='Event venue'
							/>
							<Field
								name='date'
								component={TextInput}
								placeholder='Event date'
							/>
							<Button positive type='submit'>
								Submit
							</Button>
							<Button onClick={this.props.history.goBack} type='button'>
								Cancel
							</Button>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		)
	}
}

const mapState = (state, ownProps) => {
	const eventId = ownProps.match.params.id

	let event = {
		title: '',
		date: '',
		city: '',
		venue: '',
		hostedBy: '',
	}

	// Check if there is an eventId & an events in the store
	if (eventId && state.events.length > 0) {
		event = state.events.filter((event) => event.id === eventId)[0]
	}

	return {
		event,
	}
}

const actions = {
	createEvent,
	updateEvent,
}

export default connect(
	mapState,
	actions
)(reduxForm({ form: 'eventForm' })(EventForm))
