import {
  default as React,
  Component
} from 'react';

var ReactDOM = require('react-dom');
import {
  ReactiveMap,
  AppbaseMap,
  AppbaseSearch,
  AppbaseSlider,
  AppbaseList
} from 'reactive-maps';

import { withGoogleMap } from "react-google-maps";

class Main extends Component {
	constructor(props) {
		super(props);
		this.cityQuery = this.cityQuery.bind(this);
		this.topicQuery = this.topicQuery.bind(this);
	}
	cityQuery(value) {
		if(value) {
			let field = 'group.group_city.group_city_simple';
			let match = JSON.parse(`{"${field}":` + JSON.stringify(value) + '}');
			return { match: match };
		} else return null;
	}
	topicQuery(value) {
		if(value) {
			let field = 'group.group_topics.topic_name.topic_name_simple';
			let query = JSON.parse(`{"${field}":` + JSON.stringify(value) + '}');
			return { terms: query };
		} else return null;
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config}>
					<div className="col s4">
						<div className="row h-100">
							<div className="col s12">
								<AppbaseList
									sensorId="CitySensor"
									inputData={this.props.mapping.city}
									defaultSelected="London"
									showCount={true}
									size={1000}
									multipleSelect={false}
									includeGeo={false}
									staticSearch={true}
									title="Cities"
									searchPlaceholder="Search City"
								/>
							</div>
						</div>
					</div>
					<div className="col s8 h-100" style={{height: '768px'}}>
						<AppbaseMap
							inputData={this.props.mapping.location}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lng: -122.45 }}
							historicalData={true}
							markerCluster={false}
							searchComponent="appbase"
							searchField={this.props.mapping.venue}
							mapStyle={this.props.mapStyle}
							autoCenter={true}
							searchAsMoveComponent={true}
							MapStylesComponent={true}
							title="Meetupblast"
							depends={{
								CitySensor: {"operation": "must", defaultQuery: this.cityQuery}
							}}
							/>
					</div>
				</ReactiveMap>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Blue Water",
	mapping: {
		city: 'group.group_city.group_city_simple',
		topic: 'group.group_topics.topic_name.topic_name_simple',
		venue: 'venue_name_ngrams',
		location: 'venue'
	},
	config: {
		"appbase": {
			"appname": "meetup2",
			"username": "qz4ZD8xq1",
			"password": "a0edfc7f-5611-46f6-8fe1-d4db234631f3",
			"type": "meetup"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map-container'));