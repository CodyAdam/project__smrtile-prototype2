import React from "react";

export default class TextInput extends React.Component {
	componentDidUpdate() {
		this.refs.input.value = this.props.propertie.value;
	}
	componentDidMount() {
		this.refs.input.value = this.props.propertie.value;
	}
	render() {
		const propertie = this.props.propertie;
		return (
			<div>
				<span className="input">
					{propertie.name}
					<input
						type="text"
						className="textInput"
						ref="input"
						onChange={input => {
							propertie.set(input.target.value);
						}}
					/>
				</span>
				<br />
			</div>
		);
	}
}
