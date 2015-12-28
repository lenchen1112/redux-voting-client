import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map} from 'immutable';

export const ConnectionState = React.createClass({
	mixins: [PureRenderMixin],
	render: function () {
		return (
			<div className="connectionState" style={{display: !this.props.connected ? 'block' : 'none'}}>
				{`Not connected (${this.props.state})`}
			</div>
		);
	}
});

export default connect(state => state.get('connection', Map()).toJS())(ConnectionState)
