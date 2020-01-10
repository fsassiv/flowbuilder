import React, { Component } from "react";
import "./FlowBlock.scss";

class FlowBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.uuid
    };
  }

  componentDidMount() {
    const self = new window.PlainDraggable(
      document.getElementById(this.props.uuid),
      {
        autoScroll: true,
        leftTop: true,
        onMove: this.handleMove
      }
    );
    this.setState({ self });
  }

  handleMove = () => {
    this.props.handleMove(this.state.id);
  };

  render() {
    const { id } = this.state;

    return (
      <div
        className="flowblock"
        onClick={event => this.props.handleClick(event)}
        id={id}
      >
        Drag Me
      </div>
    );
  }
}

export default FlowBlock;
