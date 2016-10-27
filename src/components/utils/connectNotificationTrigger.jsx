import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';

import {prepareNotification, preparePopover, isMouseOutOfComponent} from './';

export default function connectNotificationTrigger (Component, props) {
  return class NotificationTrigger extends React.Component {
    static propTypes = {
      notification : PropTypes.object,
      popover      : PropTypes.object
    };

    state = {
      notification: null
    };

    constructor (props, context) {
      super(props, context);
      this.lastWidth = 0;
      this._originalCode = null;
    }

    set originalCode (value) {
      if (this._originalCode === null) {
        this._originalCode = value;
      }
    }

    get originalCode () {
      return this._originalCode;
    }

    componentDidMount () {
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('click', this.handleClosePopover);
      window.addEventListener('touchstart', this.handleClosePopover);
    }

    componentWillUnmount () {
      this.hideNotification();

      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('click', this.handleClosePopover);
      window.removeEventListener('touchstart', this.handleClosePopover);
    }

    getTargetCoords = () => {
      const target = ReactDOM.findDOMNode(this.target);

      let data = {
        top    : target.offsetTop,
        left   : target.offsetLeft,
        width  : target.offsetWidth,
        height : target.offsetHeight
      };

      return data;
    };

    showNotification = () => {
      if (!this.popup) {
        this.targetNode = ReactDOM.findDOMNode(this.target);

        let preparedNotification = this.props.popover
          ? preparePopover(this.props.popover, this.hideNotification)
          : prepareNotification(this.props.notification, this.hideNotification);

        this.notification = React.cloneElement(preparedNotification, {
          ref: c => this.notification = c
        });
        this.popup = document.createElement('div');
        this.targetNode.appendChild(this.popup);
        ReactDOM.render(this.notification, this.popup);
        setTimeout(() => {
          this.setState({notification: this.notification});
          if (this.props.notificationAlt.status) {
            this.calcSidePosition();
          }
        }, 100);
        this.handleResize();
      }
    };

    hideNotification = () => {
      if (this.popup) {
        ReactDOM.unmountComponentAtNode(this.popup);
        if (this.targetNode) {
          this.targetNode.removeChild(this.popup);
        }
        this.popup = null;
        this.props.resetValidationStatus();
        this.setState({notification: null});
      }
    };

    handleClosePopover = (e) => {
      let clickTarget = e.target.getAttribute('class');
      if (clickTarget === 'TMUI__Notification__closeBlock__closeArea' && this.state.notification) {
        e.stopPropagation();

        if (isMouseOutOfComponent({
          container : this.state.notification,
          pageX     : e.pageX,
          pageY     : e.pageY
        })) {
          this.hideNotification();
        }
      }
    };

    handleResize = () => {
      if (this.notification) {
        const targetCoords = this.getTargetCoords();
        const notificationCoords = this.calcNotificationCoords(targetCoords);

        this.notification.setPosition(notificationCoords);

        if (this.props.notificationAlt.status) {
          setTimeout(() => {
            this.calcSidePosition();
          }, 150);
        }
      }
    };
    rerenderNotice = (newCode) => {
      let {text, maxWidth} = this.props.notification;
      let newTooltip = prepareNotification({code: newCode || this.originalCode, text, maxWidth}, this.hideNotification);
      this.notification = React.cloneElement(newTooltip, {
        ref: c => this.notification = c
      });
      ReactDOM.render(this.notification, this.popup);
    };
    calcSidePosition () {
      if (!this.notification) {
        return false;
      }
      const notification = ReactDOM.findDOMNode(this.notification);
      const windowWidth = window.innerWidth;
      const rect = notification.getBoundingClientRect();
      const rightOffSet = windowWidth - rect.right;
      switch (this.notification.props.position) {
        case 'left':
          if (rect.left <= 0 && this.lastWidth === 0) {
            this.lastWidth = windowWidth + ((rect.left * -1) * 2);
            this.originalCode = this.props.notification.code;
          }

          if (windowWidth > this.lastWidth) {
            this.lastWidth = 0;
          }

          if (this.lastWidth !== 0) {
            this.rerenderNotice(this.props.notificationAlt.type);
          }
          break;
        case 'right':
          if (rightOffSet <= 0 && this.lastWidth === 0) {
            this.lastWidth = windowWidth + ((rightOffSet * -1) * 2);
            this.originalCode = this.props.notification.code;
          }

          if (windowWidth > this.lastWidth) {
            this.lastWidth = 0;
          }

          if (this.lastWidth !== 0) {
            this.rerenderNotice(this.props.notificationAlt.type);
          }
          break;
        case 'top':
          if (windowWidth > this.lastWidth && this.lastWidth !== 0) {
            this.lastWidth = 0;
            this.rerenderNotice(this.originalCode);
          }
          break;
        case 'bottom':
          if (windowWidth > this.lastWidth && this.lastWidth !== 0) {
            this.lastWidth = 0;
            this.rerenderNotice(this.originalCode);
          }
      }
      if (this.lastWidth !== 0) {
        const targetCoords = this.getTargetCoords();
        const notificationCoords = this.calcNotificationCoords(targetCoords);
        this.notification.setPosition(notificationCoords);
      }
    };
    calcNotificationCoords (targetCoords) {
      let coords = {};
      const {width, height} = targetCoords;
      const notification = ReactDOM.findDOMNode(this.notification);
      switch (this.notification.props.position) {
        case 'left':
          coords.top = (height / 2) - (notification.offsetHeight / 2);
          coords.left = notification.offsetWidth - 20;
          break;
        case 'right':
          coords.top = (height / 2) - (notification.offsetHeight / 2);
          coords.left = width + 20;
          break;
        case 'top':
          coords.top = height * -1;
          coords.left = (width / 2) - (notification.offsetWidth / 2);
          break;
        default:
          coords.top = height + 20;
          coords.left = (width / 2) - (notification.offsetWidth / 2);
      }

      return coords;
    }

    render () {
      return (
        <Component
          {...this.props}
          ref={c => this.target = c}
          handleHideNotification={this.hideNotification}
        />
      );
    }
  };
}
