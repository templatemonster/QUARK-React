import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';

import {prepareNotification, preparePopover, isMouseOutOfComponent} from './';

export default function connectNotificationTrigger(Component, props) {
  return class NotificationTrigger extends React.Component {
    static propTypes = {
      notification: PropTypes.object,
      popover: PropTypes.object
    };

    state = {
      notification: null
    }

    constructor(props, context) {
      super(props, context);
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('click', this.handleClosePopover);
      window.addEventListener('touchstart', this.handleClosePopover);
    }

    componentWillUnmount() {
      this.hideNotification();

      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('click', this.handleClosePopover);
      window.removeEventListener('touchstart', this.handleClosePopover);
    }

    getTargetCoords = () => {
      const target = ReactDOM.findDOMNode(this.target);

      let data = {
        top: target.offsetTop,
        left: target.offsetLeft,
        width: target.offsetWidth,
        height: target.offsetHeight
      };

      return data;
    }

    showNotification = () => {
      if (!this.popup) {
        this.targetNode = ReactDOM.findDOMNode(this.target);

        const preparedNotification = this.props.popover
          ? preparePopover(this.props.popover, this.hideNotification)
          : prepareNotification(this.props.notification, this.hideNotification);

        this.notification = React.cloneElement(preparedNotification, {
          ref: c => this.notification = c
        });

        this.popup = document.createElement('div');
        this.targetNode.appendChild(this.popup);
        ReactDOM.render(this.notification, this.popup);

        this.handleResize();

        setTimeout(() => {
          this.setState({notification: this.notification});
        }, 100);
      }
    }

    hideNotification = () => {
      if (this.popup) {
        ReactDOM.unmountComponentAtNode(this.popup);
        if (this.targetNode) {
          this.targetNode.removeChild(this.popup);
        }
        this.popup = null;

        this.setState({notification: null});
      }
    }

    handleClosePopover = (e) => {
      if (this.props.popover && this.state.notification) {
        e.stopPropagation();

        if (isMouseOutOfComponent({
            container: this.state.notification,
            pageX: e.pageX,
            pageY: e.pageY
          })) {
          this.hideNotification();
          props.onHide();
        }
      }
    }

    handleResize = () => {
      if (this.notification) {
        const targetCoords = this.getTargetCoords();
        const notificationCoords = this.calcNotificationCoords(targetCoords);

        this.notification.setPosition(notificationCoords);
      }
    }

    calcNotificationCoords(targetCoords) {
      const coords = {};
      const {top, left, width, height} = targetCoords;
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
          coords.top = notification.offsetHeight - 20;
          coords.left = (width / 2) - (notification.offsetWidth / 2);
          break;
        default:
          coords.top = height + 20;
          coords.left = (width / 2) - (notification.offsetWidth / 2);
      }

      return coords;
    }

    render() {
      return (
        <Component
          {...this.props}
          ref                     = {c => this.target = c}
          handleHideNotification  = {this.hideNotification}
        />
      );
    }
  };
}