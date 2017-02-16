import React, { Component } from 'react';
import Immutable from 'immutable';
import Patrun from 'patrun';


const initial = Immutable.fromJS([
  {
    rule: {country: 'IE'},
    value: 0.25
  },
  {
    rule: {country: 'UK'},
    value: 0.20
  },
  {
    rule: {country: 'DE'},
    value: 0.19
  },
  {
    rule: {country: 'IE', type: 'reduced'},
    value: 0.135
  },
  {
    rule: {country: 'IE', type: 'food'},
    value: 0.048
  },
  {
    rule: {country: 'UK', type: 'food'},
    value: 0.0
  },
  {
    rule: {country: 'US', state: 'AL'},
    value: 0.04
  },
  {
    rule: {country: 'US', state: 'AL', city: 'Montgomery'},
    value: 0.10
  },
  {
    rule: {country: 'US', state: 'NY'},
    value: 0.07
  },
])

const getKeys = (data) => {
  const rules = data.reduce((red, value) => {
    const newKeys = value.get('rule').keySeq();
    const union = red.union(newKeys);
    return union;
  }, new Immutable.Set())
  return rules;
}

class Editor extends Component {
  render() {
    const keys = getKeys(initial);
    const headline = keys.map((k) => (<th key={k}>{k}</th>));
    const contentLines = initial.map((rule, i) => {
      const line = keys.map((key) => {
        return <td key={key}>{rule.getIn(['rule',key])}</td>
      })
      return (
        <tr key={i}>
          {line}
          <td>{rule.get('value')}</td>
        </tr>
      )
    })
    return (
      <div className="Editor">
      <table className="table table-bordered">
        <thead>
          <tr>
            {headline}
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        {contentLines}
        </tbody>
      </table>
      </div>
    );
  }
}

export default Editor;
