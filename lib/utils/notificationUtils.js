'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareNotification = prepareNotification;
exports.delay = delay;
exports.clearDelay = clearDelay;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _notifications = require('ui-toolkit/lib/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notificationTimeout = void 0;

function prepareNotification(notification, handleHide) {
  if (notification) {
    var NotificationComponent = _notifications2.default[notification.code];
    var notificationClassnames = (0, _classnames2.default)({
      'animatedRightToLeft': ['N1A', 'N2A', 'N3A'].indexOf(notification.code) >= 0,
      'animatedLeftToRight': ['N1B', 'N2B', 'N3B'].indexOf(notification.code) >= 0,
      'animatedUpToDown': ['N1C', 'N2C', 'N3C'].indexOf(notification.code) >= 0,
      'animatedDownToUp': ['N1D', 'N2D', 'N3D'].indexOf(notification.code) >= 0
    });

    return _react2.default.createElement(NotificationComponent, {
      className: notificationClassnames,
      onHideNotification: handleHide,
      text: notification.text,
      maxWidth: notification.maxWidth
    });
  }

  return null;
}

function delay(func) {
  notificationTimeout = setTimeout(func, 200);
}

function clearDelay(func) {
  clearTimeout(notificationTimeout);
  func();
}