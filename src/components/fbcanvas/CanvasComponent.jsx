import React, { Component } from "react";
import FlowBlock from "./FlowBlock";
import uniqid from "uniqid";
import "./CanvasComponent.scss";

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

    newLinks.push(line1, line2, line3);
    this.setState({ links: newLinks });
  }

  render() {
    const { blocks, links } = this.state;
    const handleMove = () => {
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
    return (
      <div className="canvasComponent">
        {blocks.map(block => (
          <FlowBlock
            handleMove={id => handleMove(id)}
            handleClick={id => handleClick(id)}
            key={block.id}
            blockId={block.id}
          />
        ))}
      </div>
    );
  }
}

export default CanvasComponent;
