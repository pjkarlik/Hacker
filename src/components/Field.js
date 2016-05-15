import React from 'react';
import { distance, modus } from './MathUtils';

import FieldStyles from './Field.less';

export default class Field extends React.Component {
  static displayName = 'Field';
  static propTypes = {
    /** css modules style object **/
    classes: React.PropTypes.object,
    /** css classname applied to container **/
    className: React.PropTypes.string,
    /** Amount of squares to across a row **/
    square: React.PropTypes.number,
    /** Size of dot **/
    size: React.PropTypes.number,
    /** Field Radius **/
    radius: React.PropTypes.number,
    /** Space between dots in rows **/
    padding: React.PropTypes.number,
    /** Max grow size of dot **/
    maxTileSize: React.PropTypes.number
  };
  static defaultProps = {
    classes: FieldStyles,
    square: 20,
    size: 5,
    radius: 140,
    padding: parseInt(FieldStyles.gridPadding, 10),
    maxTileSize: 80
  };
  constructor(props) {
    super(props);
    this.cache = [];
    this.current_tiles = [];
    this.affected_tiles = [];
    this.effectMouse = this.effectMouse.bind(this);
    this.effectTouch = this.effectTouch.bind(this);
    this.originalPosition = this.originalPosition.bind(this);
    this.effectObjects = this.effectObjects.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.effectMouse);
    window.addEventListener('touchmove', this.effectTouch);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.effectMouse);
    window.removeEventListener('touchmove', this.effectTouch);
  }

  effectMouse(event) {
    const mouseEvent = {
      x: event.clientX,
      y: event.clientY
    };
    this.effectObjects(mouseEvent);
  }

  effectTouch(event) {
    const mouseEvent = {
      x: Math.floor(event.changedTouches[0].clientX),
      y: Math.floor(event.changedTouches[0].clientY)
    };
    this.effectObjects(mouseEvent);
  }

  originalPosition(element) {
    return {
      left: parseInt(element.getAttribute('data-left'), 10),
      top: parseInt(element.getAttribute('data-top'), 10)
    };
  }

  effectObjects(mouseEvent) {
    const { radius, size, padding, maxTileSize } = this.props;
    // Mouse positions, current tiles array
    this.container = this.refs.container.getBoundingClientRect();
    const _x = mouseEvent.x - this.container.left;
    const _y = mouseEvent.y - this.container.top;

    // Mod the min/max of x/y for cache look up
    const min = {
      x: modus(_x - radius, size + padding),
      y: modus(_y - radius, size + padding)
    };
    const max = {
      x: modus(_x + radius, size + padding),
      y: modus(_y + radius, size + padding)
    };
    // console.log(min.x, min.y, max.x, max.y);
    // Reset tiles that are no longer in the hit area
    for (let x = 0; x < this.affected_tiles.length; x++) {
      if (!this.cache[this.affected_tiles[x]]) {
        continue;
      }
      const tileElement = this.refs[this.cache[this.affected_tiles[x]].id];
      const original = this.originalPosition(tileElement);
      tileElement.style.left = `${original.left}px`;
      tileElement.style.top = `${original.top}px`;
      tileElement.style.width = `${size}px`;
      tileElement.style.height = `${size}px`;
      // tileElement.style.zIndex = `${1}`;
      tileElement.style.backgroundColor = `#EEE`;
    }
    this.affected_tiles = [];
    // find radius for currently effected tiles
    for (let x = min.x; x <= max.x; x = x + size + padding) {
      for (let y = min.y; y <= max.y; y = y + size + padding) {
        const cacheID = `${x}_${y}`;
        this.current_tiles.push(cacheID);
        this.affected_tiles.push(cacheID);
      }
    }

    // Loop through current tiles in cache
    for (let x = 0; x < this.current_tiles.length; x++) {
      if (!this.cache[this.current_tiles[x]]) {
        continue;
      }
      // Get the numbers
      const tileObject = this.refs[this.cache[this.current_tiles[x]].id];

      const original = this.originalPosition(tileObject);
      // Calc distance from center of tiles
      const d = distance(_x, original.left + (size / 2), _y, original.top + (size / 2));
      const newSize = maxTileSize - (maxTileSize - size) * (d / radius);
      // set styles - TODO find better way to do this
      if (d < radius && newSize > size) {
        tileObject.style.left = `${(original.left - ~~(newSize / 2) + (size / 2))}px`;
        tileObject.style.top = `${(original.top - ~~(newSize / 2) + (size / 2))}px`;
        tileObject.style.width = `${newSize}px`;
        tileObject.style.height = `${newSize}px`;
        // tileObject.style.zIndex = `${~~newSize}`;
        tileObject.style.backgroundColor = `#333`;
      } else {
        tileObject.style.left = `${original.left}px`;
        tileObject.style.top = `${original.top}px`;
        tileObject.style.width = `${size}px`;
        tileObject.style.height = `${size}px`;
        // tileObject.style.zIndex = `${1}`;
        tileObject.style.backgroundColor = `#EEE`;
      }
    }
  }
  render() {
    const { classes, className, size, square, padding } = this.props;
    const tiles = [];
    const spacing = size + padding;
    const containerStyle = {
      width: `${square * spacing}px`,
      height: `${square * spacing}px`
    };
    for (let x = 0; x < square; x++) {
      for (let y = 0; y < square; y++) {
        const styleObject = {
          top: `${y * spacing}px`,
          left: `${x * spacing}px`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: `#EEE`
        };
        const tileId = `tile${x}_${y}`;
        tiles.push(
          <div key = {tileId}
            ref = {tileId}
            className = {classes.tile}
            data-top = {y * spacing}
            data-left = {x * spacing}
            style = {styleObject} />
        );
        const cacheID = `${x * spacing}_${y * spacing}`;
        this.cache[cacheID] = {
          id: tileId
        };
      }
    }
    return (
      <div className = {`${classes.container} ${className || null}`}
        style = {containerStyle}
        onTouchStart = {this.effectTouch}
        ref="container" >
        {tiles}
      </div>
    );
  }
}
