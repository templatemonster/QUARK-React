'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Notification = require('../Notification.js');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var N3E = function (_Component) {
  (0, _inherits3.default)(N3E, _Component);

  function N3E() {
    (0, _classCallCheck3.default)(this, N3E);
    return (0, _possibleConstructorReturn3.default)(this, (N3E.__proto__ || (0, _getPrototypeOf2.default)(N3E)).apply(this, arguments));
  }

  (0, _createClass3.default)(N3E, [{
    key: 'setPosition',
    value: function setPosition(coords) {
      this.notification.setPosition(coords);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_Notification2.default, {
        ref: function ref(c) {
          return _this2.notification = c;
        },
        className: this.props.className,
        text: this.props.text,
        onHideNotification: this.props.onHideNotification,
        maxWidth: this.props.maxWidth,
        status: 'success',
        size: 'large',
        position: 'top'
      });
    }
  }]);
  return N3E;
}(_react.Component);

N3E.propTypes = {
  text: _react.PropTypes.string.isRequired,
  onHideNotification: _react.PropTypes.func.isRequired,
  maxWidth: _react.PropTypes.string,
  className: _react.PropTypes.string
};
N3E.defaultProps = {
  position: 'top'
};
exports.default = N3E;