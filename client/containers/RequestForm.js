import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions/request';
import { connect } from 'react-redux';
import { Field, SubmissionError } from 'redux-form';
import { reduxForm, formValueSelector } from 'redux-form';
import './RequestForm.styles.css';


function EmailField(props) {
  const { languageDictionary = {}, meta: { touched, error, warning } } = props;

  return (
    <div className={`form-group ${touched && error ? 'has-error' : ''} ${touched && warning ? 'has-warning' : ''}`}>
      <div className={`input-group`}>
        <span className="input-group-addon"><i className='icon icon-budicon-778'/></span>
        <input
          {...props.input}
          className="form-control"
          placeholder={languageDictionary.email || 'Email'}
        />
      </div>
      {touched && ((error && <span className="help-block">{error}</span>)
        || (warning && <span className="help-block">{warning}</span>))}
    </div>
  );
}


class RequestForm extends Component {
  static propTypes = {
    makeRequest: PropTypes.func.isRequired
  };

  state = {
    status: null
  };

  submit = async (values) => {
    const languageDictionary = this.props.languageDictionary || {};

    try {
      const result = await this.props.makeRequest(values);
      console.log('-------------------->>', result);
      this.setState({ status: 'ok' });
      return result;
    } catch (err) {
      console.error(err);
      throw new SubmissionError({
        _error: languageDictionary.regReuestAccepted || 'Request failed'
      })
    }
  };

  render() {
    const { handleSubmit, pristine, reset, error, submitting } = this.props;
    const { status } = this.state;

    const languageDictionary = this.props.languageDictionary || {};

    console.log('>>>>>>>>>>>>>>>', error);

    if (status === 'ok') {
      return (
        <div className={'RequestForm'} onSubmit={handleSubmit(this.submit)}>
          <h2 className={'text-success'}>{languageDictionary.regReuestAccepted || 'Registration request accepted'}!</h2>
        </div>
      );
    }

    return (
      <form className={'RequestForm'} onSubmit={handleSubmit(this.submit)}>
        <div className={'RequestForm-container'}>
          <div className={'RequestForm-header'}>
            <h3>{languageDictionary.regReuest || 'Registration request'}</h3>
          </div>
          <div className={'RequestForm-body'}>
            {error && (
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                {error}
              </div>
            )}
            <Field
              name="email"
              type="email"
              languageDictionary={languageDictionary}
              component={EmailField}
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
}, actions);

export default connectDecorator(reduxFormDecorator(RequestForm));
