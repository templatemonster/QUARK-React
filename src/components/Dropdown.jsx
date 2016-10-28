import React from 'react';

import './Dropdown.less';

export default class Dropdown extends React.Component {
  static propTypes = {
    defaultOpen        : React.PropTypes.bool,
    type               : React.PropTypes.oneOf([1, 2, 3]).isRequired,
    className          : React.PropTypes.string,
    id                 : React.PropTypes.string,
    disabled           : React.PropTypes.bool,
    label              : React.PropTypes.string,
    filterQuery        : React.PropTypes.string,
    filterText         : React.PropTypes.string,
    defaultFilterQuery : React.PropTypes.string,
    noResultsText      : React.PropTypes.string,
    options            : React.PropTypes.array.isRequired,
    optionsToShow      : React.PropTypes.number,
    defaultValue       : React.PropTypes.string,
    onOpen             : React.PropTypes.func,
    onClose            : React.PropTypes.func,
    onChange           : React.PropTypes.func
  }

  static defaultProps = {
    defaultOpen        : false,
    defaultFilterQuery : '',
    defaultValue       : ''
  }

  state = {
    open        : this.props.defaultOpen,
    filterQuery : this.props.defaultFilterQuery,
    value       : this.props.options[0] ? this.props.options[0].value : this.props.defaultValue
  }

  constructor (props) {
    super(props);

    this.open                  = this.open.bind(this);
    this.close                 = this.close.bind(this);
    this.toggle                = this.toggle.bind(this);
    this.handleFilterInput     = this.handleFilterInput.bind(this);
    this.handleFilterBlur      = this.handleFilterBlur.bind(this);
    this.handleFilterKeyDown   = this.handleFilterKeyDown.bind(this);
    this.handleOptionClick     = this.handleOptionClick.bind(this);
    this.handleOptionKeyDown   = this.handleOptionKeyDown.bind(this);
    this.handleDropdownKeyDown = this.handleDropdownKeyDown.bind(this);
    this.handleDropdownBlur    = this.handleDropdownBlur.bind(this);
    this.getValue              = this.getValue.bind(this);
    this.getOptionByValue      = this.getOptionByValue.bind(this);
    this.setContentPosition    = this.setContentPosition.bind(this);
    this.renderLabel           = this.renderLabel.bind(this);
    this.renderContent         = this.renderContent.bind(this);
    this.renderOptions         = this.renderOptions.bind(this);

    this.contentPosition = 'bottom';
  }

  open () {
    this.setContentPosition();

    this.setState({
      open: true
    }, () => {
      if (this.props.type === 3) {
        this.filterInput.value = '';
        this.filterInput.focus();
      }
      this.props.onOpen ? this.props.onOpen() : null;
    });
  }

  close () {
    this.setState({
      open: false
    }, () => {
      this.props.onClose ? this.props.onClose() : null;
    });
  }

  toggle () {
    this.state.open ? this.close() : this.open();
  }

  handleFilterInput () {
    const filterValue = this.filterInput.value;

    this.setState({
      filterQuery: filterValue.trim()
    });
  }

  handleFilterBlur () {
    this.filterInput.value = this.filterInput.value.trim();
  }

  handleFilterKeyDown (event) {
    const keyCode = event.keyCode;

    if (keyCode === 40 && this.option0) {
      this.option0.focus();
    }
  }

  handleOptionClick (option) {
    this.setState({
      open  : false,
      value : option.value
    }, () => {
      this.props.onChange ? this.props.onChange() : null;
    });
  }

  handleOptionKeyDown (event, option, optionIndex) {
    const keyCode = event.keyCode;

    if (keyCode === 13) {
      this[`option${optionIndex}`].click();
    } else if (keyCode === 40 && this[`option${optionIndex + 1}`]) {
      this[`option${optionIndex + 1}`].focus();
    } else if (keyCode === 38) {
      if (this[`option${optionIndex - 1}`]) {
        this[`option${optionIndex - 1}`].focus();
      } else if (this.props.type === 3) {
        this.filterInput.focus();
      }
    }
  }

  handleDropdownKeyDown (event) {
    const keyCode = event.keyCode;

    if (keyCode === 27) {
      this.close();
    }
  }

  handleDropdownBlur (event) {
    if (this.container.contains(event.relatedTarget) === false && this.container !== event.relatedTarget && this.open) {
      this.close();
    }
  }

  getValue () {
    return this.state.value;
  }

  getOptionByValue (optionValue) {
    return this.props.options.filter((option) => {
      return option.value === optionValue;
    })[0];
  }

  setContentPosition () {
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const containerHeight       = this.container.offsetHeight;
    const containerTopOffset    = this.container.getBoundingClientRect().top;
    const containerBottomOffset = documentHeight - containerTopOffset - containerHeight;
    const contentHeight         = this.content.offsetHeight;

    console.log('documentHeight', documentHeight);
    console.log('containerHeight', containerHeight);
    console.log('containerTopOffset', containerTopOffset);
    console.log('containerBottomOffset', containerBottomOffset);
    console.log('contentHeight', contentHeight);

    if ((contentHeight > containerBottomOffset) && (containerTopOffset > containerBottomOffset)) {
      this.contentPosition = 'top';
    } else {
      this.contentPosition = 'bottom';
    }
  }

  renderLabel () {
    return (
      <span className="dropdown__label">{this.props.label}</span>
    );
  }

  renderContent () {
    return (
      <div
        className = "dropdown__content"
        ref       = {ref => { this.content = ref; }}
      >
        {this.props.type === 3 &&
          <div className="dropdown__filter-box">
            <input
              className   = "dropdown__filter-input"
              type        = "search"
              value       = {this.state.filterQuery}
              placeholder = {this.props.filterText || null}
              tabIndex    = {this.state.open ? '0' : '-1'}
              onChange    = {this.handleFilterInput}
              onBlur      = {this.handleFilterBlur}
              onKeyDown   = {this.handleFilterKeyDown}
              ref         = {ref => { this.filterInput = ref; }}
            />
          </div>
        }
        <ul
          className = "dropdown__options"
          ref       = {ref => { this.optionsList = ref; }}
        >
          {this.renderOptions()}
        </ul>
      </div>
    );
  }

  renderOptions () {
    const filterQuery = this.state.filterQuery.toLowerCase();

    return (
      this.props.options.map((option, index) => {
        return (
          <li
            className  = {`dropdown__option${this.state.value === option.value ? ' dropdown__option_selected' : ''}`}
            tabIndex   = {option.disabled || this.state.open === false ? -1 : 0}
            aria-label = {option.label}
            role       = "option"
            hidden     = {option.label.toLowerCase().indexOf(filterQuery) === 0 && filterQuery.length > 0}
            onClick    = {() => { this.handleOptionClick(option); }}
            onKeyDown  = {(event) => { this.handleOptionKeyDown(event, option, index); }}
            key        = {index}
            ref        = {ref => { this[`option${index}`] = ref; }}
          >
            {option.label}
          </li>
        );
      })
    );
  }

  render () {
    const typeClassName       = ` dropdown_type_${this.props.type}`;
    const disabledClassName   = this.props.disabled ? ` dropdown_disabled` : '';
    const contentPosClassName = ` dropdown_content-position_${this.contentPosition}`;
    const openedClassName     = this.state.open ? ` dropdown_open` : ' dropdown_closed';
    const addClassName        = this.props.className ? ` ${this.props.className}` : '';
    const containerClassName  = `dropdown${typeClassName}${disabledClassName}${contentPosClassName}${openedClassName}${addClassName}`;

    const selectedOption      = this.getOptionByValue(this.state.value);
    const selectedOptionLabel = selectedOption ? selectedOption.label : this.props.options.length ? this.props.options[0].label : '';
    const selectedOptionIcon  = selectedOption ? selectedOption.icon : '';

    return (
      <div
        className = {containerClassName}
        id        = {this.props.id || null}
        tabIndex  = "-1"
        onKeyDown = {this.handleDropdownKeyDown}
        onBlur    = {this.handleDropdownBlur}
        ref       = {ref => { this.container = ref; }}
      >
        {(this.props.type === 1 || this.props.type === 2) &&
          this.renderLabel()
        }

        <button
          className  = {`dropdown__button${this.props.type === 3 ? ' icon icon-' + selectedOptionIcon + '' : ''}`}
          type       = "button"
          aria-label = {this.props.label}
          onClick    = {this.toggle}
          ref        = {ref => { this.button = ref; }}
        >
          {selectedOptionLabel}
          <span className="dropdown__arrow"></span>
        </button>

        {this.props.type === 3 &&
          this.renderLabel()
        }

        {this.renderContent()}
      </div>
    );
  }
}
