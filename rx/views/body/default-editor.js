
var React = require('react')
  , PT = React.PropTypes

var Textarea = require('./textarea-grow')

var Editor = React.createClass({
  propTypes: {
    value: PT.string,
    onBlur: PT.func,
    onChange: PT.func,
    onKeyDown: PT.func,
    goDown: PT.func,
    goUp: PT.func,
  },

  focus: function () {
    this.refs.text.focus.apply(this.refs.text, arguments)
  },

  _onKeyDown: function (e) {
    var text = this.refs.text
      , line
      , pos
    if (e.key === 'ArrowDown') {
      line = text.getCursorLine()
      if (line === -1 || line === 1) {
        this.props.goDown()
        e.preventDefault()
      }
    } else if (e.key === 'ArrowUp') {
      line = text.getCursorLine()
      if (line === 0 || line === 1) {
        this.props.goUp()
        e.preventDefault()
      }
    } else if (e.key === 'ArrowRight') {
      pos = text.getCursorPos()
      if (pos === -1 || pos === 1) {
        this.props.goDown(true)
        e.preventDefault()
      }
    } else if (e.key === 'ArrowLeft') {
      pos = text.getCursorPos()
      if (pos === 0 || pos === 1) {
        this.props.goUp()
        e.preventDefault()
      }
    } else {
      return this.props.onKeyDown(e)
    }
  },

  render: function () {
    return <Textarea
      ref="text"
      value={this.props.value}
      onChange={this.props.onChange}
      onBlur={this.props.onBlur}
      onKeyDown={this._onKeyDown}/>
  }
})

module.exports = Editor
