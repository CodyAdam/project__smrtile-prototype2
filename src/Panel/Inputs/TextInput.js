import React from "react";

export default class TextInput extends React.Component {
	componentDidUpdate() {
		this.refs.input.value = this.props.value;
	}
	componentDidMount() {
		this.refs.input.value = this.props.value;
	}
	render() {
		const { name, setName } = this.props;
		return (
			<div>
				<span className="input">
					{name}
					<input
						type="text"
						className="textInput"
						ref="input"
						onChange={input => {
							setName(input.target.value);
						}}
					/>
				</span>
				<br />
			</div>
		);
	}
}
