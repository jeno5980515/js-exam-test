import React, { Component } from 'react';
import styles from './Border.module.scss';

class Border extends Component {
  constructor(props) {
    super(props);
    const {
      allowWidth,
      allowHeight,
      disabled,
      borderSize
    } = this.props;
    this.ref = React.createRef();
    this.resize = this.resize.bind(this);
    this.startResize = this.startResize.bind(this);
    this.endResize = this.endResize.bind(this);
    this.borderSize = borderSize || 10;
    this.disabled = disabled;
    this.allowWidth = allowWidth;
    this.allowHeight = allowHeight;
    this.style = {};
  }

  resize(e) {
    const {
      allowHeight,
      height,
      width,
      onUpdate,
      allowWidth,
      maxHeight,
      maxWidth,
      minWidth,
      minHeight
    } = this.props;
    let newHeight = allowHeight
      ? e.clientY - this.ref.current.offsetTop
      : height;
    if (maxHeight && newHeight > maxHeight) {
      newHeight = maxHeight;
    }
    if (minHeight && newHeight < minHeight) {
      newHeight = minHeight;
    }
    let newWidth = allowWidth
      ? e.clientX - this.ref.current.offsetLeft
      : width;
    if (maxWidth && newWidth > maxWidth) {
      newWidth = maxWidth;
    }
    if (minWidth && newWidth < minWidth) {
      newWidth = minWidth;
    }
    onUpdate({
      width: newWidth,
      height: newHeight
    });
  }

  endResize() {
    window.removeEventListener('mousemove', this.resize);
    window.removeEventListener('mouseup', this.endResize);
    window.dispatchEvent(new Event('resize'));
  }

  startResize(e) {
    if (e.target.contains(this.ref.current)) {
      window.addEventListener('mousemove', this.resize);
      window.addEventListener('mouseup', this.endResize);
    }
  }


  render() {
    const {
      width,
      height,
      disabled,
      children,
      className
    } = this.props;
    this.style = {
      ...this.style,
      width: `${width}px`,
      height: `${height}px`
    };
    let finalClassName = `${styles.border} ${className || ''}`;
    if (!disabled && this.allowWidth) {
      finalClassName = `${finalClassName} ${styles.horizontal}`;
      this.style.paddingRight = `${this.borderSize}px`;
    }
    if (!disabled && this.allowHeight) {
      finalClassName = `${finalClassName} ${styles.vertical}`;
      this.style.paddingBottom = `${this.borderSize}px`;
    }
    return (
      <div
        ref={this.ref}
        className={finalClassName}
        onMouseDown={!disabled ? this.startResize : null}
        style={this.style}
      >
        { children }
      </div>
    );
  }
}

export default Border;
