import React from "react";
import { connect } from "react-redux";

import { moveClockwise, moveCounterClockwise } from "../state/action-creators";

function Wheel(props) {
  const { wheel, moveClockwise, moveCounterClockwise } = props;

  const counterClockWiseHandler = () => {
    switch (wheel) {
      case 0:
        moveCounterClockwise(5);
        break;
      case 1:
        moveCounterClockwise(0);
        break;
      case 2:
        moveCounterClockwise(1);
        break;
      case 3:
        moveCounterClockwise(2);
        break;
      case 4:
        moveCounterClockwise(3);
        break;
      case 5:
        moveCounterClockwise(4);
        break;
      default:
        return null;
    }
  };

  const clockwiseHandler = () => {
    switch (wheel) {
      case 0:
        moveClockwise(1);
        break;
      case 1:
        moveClockwise(2);
        break;
      case 2:
        moveClockwise(3);
        break;
      case 3:
        moveClockwise(4);
        break;
      case 4:
        moveClockwise(5);
        break;
      case 5:
        moveClockwise(0);
        break;
      default:
        return null;
    }
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={`cog ${wheel === 0 ? "active" : null}`} style={{ "--i": 0 }}>
          {wheel === 0 ? "B" : null}
        </div>
        <div className={`cog ${wheel === 1 ? "active" : null}`} style={{ "--i": 1 }}>
          {wheel === 1 ? "B" : null}
        </div>
        <div className={`cog ${wheel === 2 ? "active" : null}`} style={{ "--i": 2 }}>
          {wheel === 2 ? "B" : null}
        </div>
        <div className={`cog ${wheel === 3 ? "active" : null}`} style={{ "--i": 3 }}>
          {wheel === 3 ? "B" : null}
        </div>
        <div className={`cog ${wheel === 4 ? "active" : null}`} style={{ "--i": 4 }}>
          {wheel === 4 ? "B" : null}
        </div>
        <div className={`cog ${wheel === 5 ? "active" : null}`} style={{ "--i": 5 }}>
          {wheel === 5 ? "B" : null}
        </div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={counterClockWiseHandler}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={clockwiseHandler}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wheel: state.wheel,
  };
};

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel);
