import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Error, LoadingPanel, TableTotals } from 'auth0-extension-ui';

import * as actions from '../actions/request';
// import RequestsDialog from '../components/Requests/RequestsDialog';
import RequestsTable from '../components/Requests/RequestsTable';
import TabsHeader from '../components/TabsHeader';
import getErrorMessage from '../utils/getErrorMessage';

class RequestsContainer extends Component {
  static propTypes = {
    clearRequest: PropTypes.func.isRequired,
    fetchRequest: PropTypes.func.isRequired,
    fetchRequests: PropTypes.func.isRequired,
    request: PropTypes.object,
    accessLevel: PropTypes.object,
    requests: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    languageDictionary: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.fetchRequests();
  }

  refresh = () => {
    this.props.fetchRequests();
  };

  loadMore = () => {
    this.props.fetchRequests(this.props.requests.nextPage);
  };

  createToolbar(isBottom = false) {
    const languageDictionary = this.props.languageDictionary;
    if (isBottom && (!this.props.requests.records || this.props.requests.records.size <= 20)) {
      return <div></div>;
    }

    return (
      <ButtonToolbar className="pull-right">
        <Button bsSize="small" onClick={this.refresh} disabled={this.props.requests.loading}>
          <i className="icon icon-budicon-257"></i> {languageDictionary.logsRefreshButtonText || 'Refresh'}
        </Button>
        <Button bsStyle="primary" bsSize="small" disabled={this.props.requests.loading} onClick={this.loadMore}>
          <i className="icon icon-budicon-686"></i> {languageDictionary.logsLoadMoreButtonText || 'Load More'}
        </Button>
      </ButtonToolbar>
    );
  }

  render() {
    const { requests, accessLevel, languageDictionary, settings } = this.props;
    const originalTitle = (settings.dict && settings.dict.title) || window.config.TITLE || 'User Management';
    document.title = `${languageDictionary.userLogsTabTitle || 'requests'} - ${originalTitle}`;

    return (
      <div>
        <TabsHeader role={accessLevel.role} languageDictionary={languageDictionary}/>
        {/*<RequestsDialog*/}
        {/*  onClose={this.props.clearLog}*/}
        {/*  error={log.error}*/}
        {/*  loading={log.loading}*/}
        {/*  log={log.record}*/}
        {/*  logId={log.id}*/}
        {/*  settings={settings}*/}
        {/*  languageDictionary={languageDictionary}*/}
        {/*/>*/}
        <div className="row">
          <div className="col-xs-12 wrapper">
            {this.createToolbar(false)}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 wrapper">
            <Error title={languageDictionary.errorTitle} message={getErrorMessage(languageDictionary, requests.error, settings.errorTranslator)} />

            <LoadingPanel show={requests.loading}>
              <RequestsTable
                onOpen={this.props.fetchRequests}
                onAccept={this.props.resolveRequest}
                onDecline={this.props.resolveRequest}
                loading={requests.loading}
                requests={requests.records}
                settings={settings}
                languageDictionary={languageDictionary}
              />
            </LoadingPanel>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 wrapper">
            {this.createToolbar(true)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    requests: {
      error: state.requests.get('error'),
      loading: state.requests.get('loading'),
      records: state.requests.get('records'),
      total: state.requests.get('total'),
      nextPage: state.requests.get('nextPage')
    },
    // log: {
    //   record: state.request.get('record'),
    //   id: state.request.get('logId'),
    //   error: state.request.get('error'),
    //   loading: state.request.get('loading')
    // },
    settings: (state.settings.get('record') && state.settings.get('record').toJS().settings) || {},
    languageDictionary: state.languageDictionary.get('record').toJS()
  };
}

export default connect(mapStateToProps, actions)(RequestsContainer);
