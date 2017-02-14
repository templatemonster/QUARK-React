import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';

import {
  prepareNotification,
  isMouseOutOfComponent
} from './';

export default function connectNotificationTrigger (Component, props) {
  return class NotificationTrigger extends React.Component {
    static propTypes = {
      notification : PropTypes.object,
      popover      : PropTypes.object,
      afterClose   : PropTypes.func
    };

    static defaultProps = {
      afterClose: () => {}
    };

    state = {
      notification: null
    };

    constructor (props, context) {
      super(props, context);
      this.lastWidth = 0;
      this._originalCode = null;
      if (typeof props.notification.button !== 'undefined') {
        if (typeof props.notification.button.action === 'string') {
          switch (props.notification.button.action) {
            case 'close':
              props.notification.button.onClick = this.hideNotification;
              break;
            default:
              break;
          }
        }
      }
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

        let preparedNotification = prepareNotification(this.props.notification, this.hideNotification);

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
          this.handleResize();
        }, 100);
      }
    };

    removeNotification = () => {
      if (this.popup) {
        ReactDOM.unmountComponentAtNode(this.popup);
        if (this.targetNode) {
          this.targetNode.removeChild(this.popup);
        }
        this.popup = null;
        this.setState({notification: null});
        this.props.afterClose();
      }
    };

    hideNotification = (e, forceClose = false) => {
      if (this.popup) {
        let closeClassname = `animated-tooltip_close_${this.notification.props.position}`;
        let popupNode = this.popup.childNodes[0];
        let relativityCheck;
        let changeEvent;
        let detectEnterAction;

        if (e !== undefined) {
          relativityCheck = popupNode.contains(e.target);
          changeEvent = (e.type === 'change');
          /** need this stuff for not closing uncloseable tooltips if something was typed in another input and Enter pressed **/
          detectEnterAction = !!((e.clientX === 0) && (e.clientY === 0));
        }

        if (forceClose ||
          relativityCheck ||
          changeEvent ||
          (this.props.closeOnCLickOutside && (detectEnterAction === false))
        ) {
          popupNode.classList.add(closeClassname);
          popupNode.addEventListener('animationend', this.removeNotification);
        }
      }
    };

    handleClosePopover = (e) => {
      let clickedTargetClasses = e.target.classList;
      const isAnyNotification = document.getElementsByClassName('notification').length;

      /** elements which cause no close effect when they are clicked **/
      let matchedClasses = ['abstract-field', 'text-area__input', 'text-field__input', 'notification', 'notification__container', 'notification__text', 'password-toggle'];

      if (clickedTargetClasses !== null) {
        /** checks if any match of classes in targeted element and template classes **/
        for (let i = 0; i < clickedTargetClasses.length; i++) {
          if (matchedClasses.indexOf(clickedTargetClasses[i]) >= 0) {
            return;
          }
        }
      }

      /** if no notification on page - do nothing **/
      if (isAnyNotification === 0) {
        return;
      }

      if ((clickedTargetClasses.contains('notification__closeBlock__closeArea') && this.props.closeOnCLickOutside === false) ||
        this.props.closeOnCLickOutside === true) {
        e.stopPropagation();

        if (isMouseOutOfComponent({
          container : this.state.notification,
          pageX     : e.pageX,
          pageY     : e.pageY
        })) {
          this.hideNotification(e);
          this.props.resetValidationStatus();
          if (typeof this.props.onHide === 'function') {
            this.props.onHide();
          }
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
      let {text, maxWidth, button} = this.props.notification;
      let newTooltip = prepareNotification({
        code: newCode || this.originalCode,
        button,
        text,
        maxWidth
      }, this.hideNotification);
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
          } else if (this.lastWidth !== 0) {
            this.rerenderNotice(this.props.notificationAlt.type);
          }
          break;
        case 'right':
          if (rightOffSet <= 0 && this.lastWidth === 0) {
            this.lastWidth = windowWidth + ((rightOffSet * -1) * 2);
            this.originalCode = this.props.notification.code;
          } else if (windowWidth > this.lastWidth) {
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
          coords.left = -(notification.offsetWidth + 20);
          break;
        case 'right':
          coords.top = (height / 2) - (notification.offsetHeight / 2);
          coords.left = width + 20;
          break;
        case 'top':
          coords.top = -(notification.offsetHeight + 20);
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
