'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StarsRating = function (_Component) {
  (0, _inherits3.default)(StarsRating, _Component);

  function StarsRating() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, StarsRating);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = StarsRating.__proto__ || (0, _getPrototypeOf2.default)(StarsRating)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.props.defaultRating
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(StarsRating, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.defaultRating !== this.props.defaultRating) {
        this.setState({
          value: nextProps.defaultRating
        });
      }
    }
  }, {
    key: 'select',
    value: function select(val) {
      if (!this.props.disabled) {
        this.setState({
          value: val
        }, this.props.onChange.bind(this, val));
      } else if (this.props.noHovered) {
        this.setState({
          value: this.props.defaultRating
        }, this.props.onChange.bind(this, val));
      }
    }
  }, {
    key: 'printStarClass',
    value: function printStarClass(value, i) {
      var floor = Math.floor(value);
      var free = value - floor;
      if (floor < i && i - floor === 1) {
        switch (true) {
          case free <= 0.2:
            return 'stars-rating__icon_empty';
          case free <= 0.7:
            return 'stars-rating__icon_half';
          case free <= 0.999:
            return '';
        }
      }
      if (floor < i && i - floor > 1) {
        return 'stars-rating__icon_empty';
      }
      return '';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var starsLength = 5;
      return _react2.default.createElement(
        'div',
        { className: 'stars-rating-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'stars-rating ' + (this.props.disabled ? '' : 'stars-rating_hovered') + '\n          ' + (this.props.noHovered ? 'stars-rating_no-hovered' : '') },
          (0, _from2.default)({ length: starsLength }).map(function (value, i) {
            i++;
            return _react2.default.createElement('i', {
              key: i,
              className: 'stars-rating__icon ' + _this2.printStarClass(_this2.state.value, i),
              onClick: _this2.select.bind(_this2, i)
            });
          })
        )
      );
    }
  }]);
  return StarsRating;
}(_react.Component);

StarsRating.propTypes = {
  defaultRating: _react2.default.PropTypes.number.isRequired,
  onChange: _react2.default.PropTypes.func,
  value: _react2.default.PropTypes.number,
  disabled: _react2.default.PropTypes.bool,
  noHovered: _react2.default.PropTypes.bool
};
StarsRating.defaultProps = {
  onChange: function onChange() {},
  disabled: false,
  noHovered: false
};
exports.default = StarsRating;