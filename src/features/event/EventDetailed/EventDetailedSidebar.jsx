import React from 'react'
import { Segment, Item, Label, ItemImage } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const EventDetailedSidebar = ({ attendees }) => {
	const isHost = false

	return (
		<>
			<Segment
				textAlign='center'
				style={{ border: 'none' }}
				attached='top'
				secondary
				inverted
				color='teal'>
				{attendees && attendees.length}{' '}
				{attendees && attendees.length === 1 ? 'Person' : 'People'} going
			</Segment>
			<Segment attached>
				<Item.Group divided>
					{attendees &&
						attendees.map((attendee) => (
							<Item key={attendee.id} style={{ position: 'relative' }}>
								{isHost && (
									<Label
										style={{ position: 'absolute' }}
										color='orange'
										ribbon='right'>
										Host
									</Label>
								)}
								<ItemImage size='tiny' src={attendee.photoURL} />
								<Item.Content verticalAlign='middle'>
									<Item.Header as='h3'>
										<Link to={`/profile/${attendee.id}`}>
											{attendee.displayName}
										</Link>
									</Item.Header>
								</Item.Content>
							</Item>
						))}
				</Item.Group>
			</Segment>
		</>
	)
}

export default EventDetailedSidebar
