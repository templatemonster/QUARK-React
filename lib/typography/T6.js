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

var _TypographyText = require('../TypographyText.js');

var _TypographyText2 = _interopRequireDefault(_TypographyText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var T6 = function (_Component) {
  (0, _inherits3.default)(T6, _Component);

  function T6() {
    (0, _classCallCheck3.default)(this, T6);
    return (0, _possibleConstructorReturn3.default)(this, (T6.__proto__ || (0, _getPrototypeOf2.default)(T6)).apply(this, arguments));
  }

  (0, _createClass3.default)(T6, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _TypographyText2.default,
        {
          className: this.props.className,
          type: this.props.type,
          size: 6,
          themeType: this.props.themeType
        },
        this.props.children
      );
    }
  }]);
  return T6;
}(_react.Component);

T6.propTypes = {
  type: _react.PropTypes.string,
  themeType: _react.PropTypes.string,
  className: _react.PropTypes.string
};
exports.default = T6;