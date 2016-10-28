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

var N2A = function (_Component) {
  (0, _inherits3.default)(N2A, _Component);

  function N2A() {
    (0, _classCallCheck3.default)(this, N2A);
    return (0, _possibleConstructorReturn3.default)(this, (N2A.__proto__ || (0, _getPrototypeOf2.default)(N2A)).apply(this, arguments));
  }

  (0, _createClass3.default)(N2A, [{
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
        status: 'error',
        size: 'small',
        position: 'left'
      });
    }
  }]);
  return N2A;
}(_react.Component);

N2A.propTypes = {
  text: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string
};
N2A.defaultProps = {
  position: 'left'
};
exports.default = N2A;