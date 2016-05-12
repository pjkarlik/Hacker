import React from 'react';
import { distance, modus, originalPosition } from './MathUtils';

import FieldStyles from './Field.less';

export default class Field extends React.Component {
  static displayName = 'Field';
  static propTypes = {
    classes: React.PropTypes.object,
    className: React.PropTypes.string,
    square: React.PropTypes.number,
    size: React.PropTypes.number,
    radius: React.PropTypes.number,
    padding: React.PropTypes.number,
    maxTileSize: React.PropTypes.number
  };
  static defaultProps = {
    classes: FieldStyles,
    square: 20,
    size: 5,
    radius: 120,
    padding: 20,
    maxTileSize: 80
  };
  constructor(props) {
    super(props);
    this.cache = [];
    this.current_tiles = [];
    this.affected_tiles = [];
    this.effectObjects = this.effectObjects.bind(this);
  }

  componentDidMount() {
    this.refs.container.addEventListener('mousemove', (event) => {
      this.effectObjects(event);
    }, false);
  }

  componentWillUnmount() {
    this.refs.container.removeEventListener('mousemove', this.effectObjects, false);
  }

  effectObjects(event) {
    const { radius, size, padding, maxTileSize } = this.props;
    // Mouse positions, current tiles array
    this.container = this.refs.container.getBoundingClientRect();
    const _x = event.clientX - this.container.left;
    const _y = event.clientY - this.container.top;

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
      const original = originalPosition(tileElement);
      tileElement.style.left = `${original.left}px`;
      tileElement.style.top = `${original.top}px`;
      tileElement.style.width = `${size}px`;
      tileElement.style.height = `${size}px`;
      tileElement.style.zIndex = `${1}`;
      tileElement.style.backgroundColor = `#EEE`;
    }
    this.affected_tiles = [];

    for (let x = min.x; x <= max.x; x = x + size + padding) {
      for (let y = min.y; y <= max.y; y = y + size + padding) {
        const cacheID = `${x}_${y}`;
        this.current_tiles.push(cacheID);
        this.affected_tiles.push(cacheID);
      }
    }

    // Loop through current tiles
    for (let x = 0; x < this.current_tiles.length; x++) {
      if (!this.cache[this.current_tiles[x]]) {
        continue;
      }
      // Get the numbers
      const tileObject = this.refs[this.cache[this.current_tiles[x]].id];

      const original = originalPosition(tileObject);
      // Calc distance from center of tiles
      const d = distance(_x, original.left + (size / 2), _y, original.top + (size / 2));
      const newSize = maxTileSize - (maxTileSize - size) * (d / radius);

      if (d < radius && newSize > size) {
        tileObject.style.left = `${(original.left - ~~(newSize / 2) + (size / 2))}px`;
        tileObject.style.top = `${(original.top - ~~(newSize / 2) + (size / 2))}px`;
        tileObject.style.width = `${newSize}px`;
        tileObject.style.height = `${newSize}px`;
        tileObject.style.zIndex = `${~~newSize}`;
        tileObject.style.backgroundColor = `#333`;
      } else {
        tileObject.style.left = `${original.left}px`;
        tileObject.style.top = `${original.top}px`;
        tileObject.style.width = `${size}px`;
        tileObject.style.height = `${size}px`;
        tileObject.style.zIndex = `${1}`;
        tileObject.style.backgroundColor = `#EEE`;
      }
    }
  }
  render() {
    const { classes, size, square, padding } = this.props;
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
      <div className = {classes.container} style = {containerStyle} ref="container">
        {tiles}
      </div>
    );
  }
}
