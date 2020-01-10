import React, { Component } from "react";
import "./FlowBlock.scss";

class FlowBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.blockId,
      initialPosition: {
        top: 0,
        left: 0
      }
    };
  }

  componentDidMount() {
    const self = new window.PlainDraggable(
      document.getElementById(this.props.blockId),
      {
        autoScroll: true,
        leftTop: true,
        onMove: this.handleMove
      }
    );
    this.setState({ self }, () => {
      this.state.self.position({ ...this.state.initialPosition });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this);
  }

  handleMove = () => {
    const { self } = this.state;
    const { top, left } = self;

    this.props.handleMove(this.state.id);
    //update element position in te DB
    this.setState({ initialPosition: { top, left } });
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
