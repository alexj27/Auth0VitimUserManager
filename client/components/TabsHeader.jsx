import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabPane } from 'auth0-extension-ui';
import { Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/request';


class TabsHeader extends Component {
  static propTypes = {
    role: PropTypes.number,
    languageDictionary: PropTypes.object,
    requests: PropTypes.object,
  };

  render() {
    const hasLogsAccess = this.props.role >= 2;
    const hasRequestsAccess = this.props.role >= 2;

    const languageDictionary = this.props.languageDictionary || {};

    return (
      <div className="widget-title title-with-nav-bars">
        <ul className="nav nav-tabs">
          <TabPane
            title={languageDictionary.userUsersTabTitle || 'Users'}
            route="users"/>
          {hasLogsAccess ?
            <TabPane
              title={languageDictionary.userLogsTabTitle || 'Logs'}
              route="logs"/> : null}
          {hasRequestsAccess ?
            <TabPane
              title={(
                <div>
                  {languageDictionary.userRequestsTabTitle || 'Requests'}
                  {' '}
                  {this.props.requests.records.size && <Badge variant="light">{this.props.requests.records.size}</Badge>}
                </div>)}
              route="requests"/> : null}
        </ul>
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
  };
}

export default connect(mapStateToProps)(TabsHeader);
