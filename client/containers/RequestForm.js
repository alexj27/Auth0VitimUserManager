import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { reduxForm, formValueSelector } from 'redux-form';
import './RequestForm.styles.css';


class RequestForm extends Component {
  static propTypes = {};

  submit = (values) => {
    console.log('--------------', values);
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    const languageDictionary = this.props.languageDictionary || {};

    return (
      <form className={'RequestForm'} onSubmit={handleSubmit(this.submit)}>
        <div className={'RequestForm-container'}>
          <div className={'RequestForm-header'}>
            <h3>{languageDictionary.regReuest || 'Registration request'}</h3>
          </div>
          <div className={'RequestForm-body'}>
            <Field
              name="email"
              type="email"
              component={(props) => {
                const { meta: { touched, error, warning } } = props;
                console.log('>>>>>>>>>>>', props);

                return (
                  <div className={`form-group ${touched && error ? 'has-error' : ''} ${touched && warning ? 'has-warning' : ''}`}>
                    <div className={`input-group`}>
                      <span className="input-group-addon"><i className='icon icon-budicon-778' /></span>
                      <input
                        {...props.input}
                        className="form-control"
                        placeholder={languageDictionary.email || 'Email'}
                        aria-label={languageDictionary.email || 'Email'}
                        aria-describedby="basic-addon1"/>
                    </div>
                    {touched && ((error && <span className="help-block">{error}</span>)
                        || (warning && <span className="help-block">{warning}</span>))}
                  </div>
                );
              }}
              placeholder={languageDictionary.email || 'Email'}
              validate={
                (f) => {
                  if (f) {
                    if (!f.includes('@')) {
                      return languageDictionary.invalidEmail || 'Invalid email';
                    }
                  } else {
                    return languageDictionary.required || 'Required';
                  }
                }
              }
            />
          </div>
          <div className={'RequestForm-footer'}>
            <button type="submit" disabled={submitting}>{languageDictionary.request || 'Request'}</button>
          </div>
        </div>
      </form>
    );
  }
}

const reduxFormDecorator = reduxForm({
  form: 'request'
});

// Decorate with connect to read form values
const selector = formValueSelector('user');
const connectDecorator = connect(state => {
  const hasSelectedConnection = selector(state, 'connection');
  const hasMembership = selector(state, 'memberships');

  return {
    hasSelectedConnection,
    hasMembership
  };
});

export default connectDecorator(reduxFormDecorator(RequestForm));
