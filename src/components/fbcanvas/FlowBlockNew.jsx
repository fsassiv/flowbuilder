import React, { Component } from "react";
import interact from "interactjs";
import "./FlowBlock.scss";

export default class FlowBlockNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.blockId
    };
  }

  componentDidMount() {
    //https://interactjs.io/
    interact(`#${this.props.blockId}`).draggable({
      // enable inertial throwing
      inertia: false,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true
        })
      ],
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: this.dragMoveListener,
      // call this function on every dragend event
      onend: null
    });

    // document.getElementById(`${this.props.blockId}`).setAttribute("data-x", 0);
    // document.getElementById(`${this.props.blockId}`).setAttribute("data-y", 0);
  }

  dragMoveListener = event => {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);

    //emit event for update lines
    this.props.handleMove(target.id);
  };

  render() {
    return (
      <div
        className="flowblock"
        id={this.props.blockId}
        onClick={event => this.props.handleClick(event)}
      >
        Drag me Too
      </div>
    );
  }
}
