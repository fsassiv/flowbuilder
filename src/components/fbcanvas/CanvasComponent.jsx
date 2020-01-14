import React, { Component } from "react";
import interact from "interactjs";
// import FlowBlock from "./FlowBlock";
import uniqid from "uniqid";
import "./CanvasComponent.scss";
import FlowBlockNew from "./FlowBlockNew";

class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [
        { id: uniqid() },
        { id: uniqid() },
        { id: uniqid() },
        { id: uniqid() }
      ],
      links: [],
      linkSettings: {
        color: "#64b5f6",
        size: 2,
        startPlug: "disc",
        dropShadow: {
          dx: 0,
          dy: 2,
          blur: 0.8,
          opacity: 0.25
        },
        hide: true
      }
    };
  }
  componentDidMount() {
    const { blocks, links, linkSettings } = this.state;
    const newLinks = [...links];
    const line2 = new window.LeaderLine(
      document.getElementById(blocks[1].id),
      document.getElementById(blocks[3].id),
      { ...linkSettings }
    );
    const line1 = new window.LeaderLine(
      document.getElementById(blocks[1].id),
      document.getElementById(blocks[2].id),
      { ...linkSettings }
    );
    const line3 = new window.LeaderLine(
      document.getElementById(blocks[2].id),
      document.getElementById(blocks[0].id),
      { ...linkSettings }
    );

    // const line4 = new window.LeaderLine(
    //   document.getElementById(blocks[2].id),
    //   document.getElementById("fb-test"),
    //   { ...linkSettings }
    // );

    newLinks.push(line1, line2, line3);
    this.setState({ links: newLinks });

    window.addEventListener("scroll", event => {
      this.setState({ canvasZoom: this.props.zoom });
    });

    //https://interactjs.io/
    interact(`#canvasComponent`).draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          elementRect: { left: 1, right: 0, top: 1, bottom: 0 }
          // endOnly: true
        })
      ],
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: this.dragMoveListener,
      // call this function on every dragend event
      onend: null
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { links } = this.state;
    links.forEach(link => {
      link.position();
    });
  }

  dragMoveListener = event => {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    //set to 0 to reset the position
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);

    //update lines
    this.state.links.forEach(link => {
      link.position();
    });
    //emit event for update lines
    // this.props.handleMove(target.id);
  };

  render() {
    const { blocks, links } = this.state;
    const { zoom } = this.props;

    const handleMove = () => {
      //update lines on moviment
      links.forEach(link => {
        link.position();
      });
    };

    const handleClick = event => {
      const { id } = event.target;
      const { links } = this.state;
      links.forEach(link => {
        if (link.start.id === id || link.end.id === id) {
          link.show("draw", { duration: 300, timing: "linear" });
        }
      });
    };

    const reset = () => {
      document.getElementById("canvasComponent").setAttribute("data-x", 0);
      document.getElementById("canvasComponent").setAttribute("data-y", 0);
      document.getElementById(
        "canvasComponent"
      ).style.webkitTransform = document.getElementById(
        "canvasComponent"
      ).style.transform = "translate(" + 0 + "px, " + 0 + "px)";
    };

    return (
      <div
        className="canvasComponent"
        id="canvasComponent"
        style={{
          transform: `scale(${zoom})`,
          width: "100vw",
          height: "100vh"
        }}
        // draggable="true"
      >
        {blocks.map(block => (
          <FlowBlockNew
            handleMove={id => handleMove(id)}
            handleClick={id => handleClick(id)}
            key={block.id}
            blockId={block.id}
          />
        ))}
        {/* <FlowBlockNew handleMove={id => handleMove(id)} /> */}
        <button className="focus-btn" onClick={reset}>
          Reset
        </button>
      </div>
    );
  }
}

export default CanvasComponent;
