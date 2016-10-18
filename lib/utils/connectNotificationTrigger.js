'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = connectNotificationTrigger;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectNotificationTrigger(Component, props) {
  var _class, _temp, _initialiseProps;

  return _temp = _class = function (_React$Component) {
    (0, _inherits3.default)(NotificationTrigger, _React$Component);

    function NotificationTrigger(props, context) {
      (0, _classCallCheck3.default)(this, NotificationTrigger);

      var _this = (0, _possibleConstructorReturn3.default)(this, (NotificationTrigger.__proto__ || (0, _getPrototypeOf2.default)(NotificationTrigger)).call(this, props, context));

      _initialiseProps.call(_this);

      return _this;
    }

    (0, _createClass3.default)(NotificationTrigger, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('click', this.handleClosePopover);
        window.addEventListener('touchstart', this.handleClosePopover);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.hideNotification();

        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('click', this.handleClosePopover);
        window.removeEventListener('touchstart', this.handleClosePopover);
      }
    }, {
      key: 'calcNotificationCoords',
      value: function calcNotificationCoords(targetCoords) {
        var coords = {};
        var top = targetCoords.top;
        var left = targetCoords.left;
        var width = targetCoords.width;
        var height = targetCoords.height;

        var notification = _reactDom2.default.findDOMNode(this.notification);

        switch (this.notification.props.position) {
          case 'left':
            coords.top = height / 2 - notification.offsetHeight / 2;
            coords.left = notification.offsetWidth - 20;
            break;
          case 'right':
            coords.top = height / 2 - notification.offsetHeight / 2;
            coords.left = width + 20;
            break;
          case 'top':
            coords.top = notification.offsetHeight - 20;
            coords.left = width / 2 - notification.offsetWidth / 2;
            break;
          default:
            coords.top = height + 20;
            coords.left = width / 2 - notification.offsetWidth / 2;
        }

        return coords;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(Component, (0, _extends3.default)({}, this.props, {
          ref: function ref(c) {
            return _this2.target = c;
          },
          handleHideNotification: this.hideNotification
        }));
      }
    }]);
    return NotificationTrigger;
  }(_react2.default.Component), _class.propTypes = {
    notification: _react.PropTypes.object,
    popover: _react.PropTypes.object
  }, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.state = {
      notification: null
    };

    this.getTargetCoords = function () {
      var target = _reactDom2.default.findDOMNode(_this3.target);

      var data = {
        top: target.offsetTop,
        left: target.offsetLeft,
        width: target.offsetWidth,
        height: target.offsetHeight
      };

      return data;
    };

    this.showNotification = function () {
      if (!_this3.popup) {
        _this3.targetNode = _reactDom2.default.findDOMNode(_this3.target);

        var preparedNotification = _this3.props.popover ? (0, _.preparePopover)(_this3.props.popover, _this3.hideNotification) : (0, _.prepareNotification)(_this3.props.notification, _this3.hideNotification);

        _this3.notification = _react2.default.cloneElement(preparedNotification, {
          ref: function ref(c) {
            return _this3.notification = c;
          }
        });

        _this3.popup = document.createElement('div');
        _this3.targetNode.appendChild(_this3.popup);
        _reactDom2.default.render(_this3.notification, _this3.popup);

        _this3.handleResize();

        setTimeout(function () {
          _this3.setState({ notification: _this3.notification });
        }, 100);
      }
    };

    this.hideNotification = function () {
      if (_this3.popup) {
        _reactDom2.default.unmountComponentAtNode(_this3.popup);
        if (_this3.targetNode) {
          _this3.targetNode.removeChild(_this3.popup);
        }
        _this3.popup = null;

        _this3.setState({ notification: null });
      }
    };

    this.handleClosePopover = function (e) {
      if (_this3.props.popover && _this3.state.notification) {
        e.stopPropagation();

        if ((0, _.isMouseOutOfComponent)({
          container: _this3.state.notification,
          pageX: e.pageX,
          pageY: e.pageY
        })) {
          _this3.hideNotification();
          props.onHide();
        }
      }
    };

    this.handleResize = function () {
      if (_this3.notification) {
        var targetCoords = _this3.getTargetCoords();
        var notificationCoords = _this3.calcNotificationCoords(targetCoords);

        _this3.notification.setPosition(notificationCoords);
      }
    };
  }, _temp;
}