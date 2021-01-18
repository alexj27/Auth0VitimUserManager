import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Error,
  LoadingPanel,
  Table,
  TableBody,
  TableTextCell,
  TableHeader,
  TableColumn,
  TableRow
} from 'auth0-extension-ui';
import moment from 'moment';
import getErrorMessage from '../../utils/getErrorMessage';
import { Button, ButtonToolbar } from 'react-bootstrap';

export default class RequestsTable extends Component {
  static propTypes = {
    onOpen: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    requests: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    isUserrequests: PropTypes.bool,
    languageDictionary: PropTypes.object
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.requests !== this.props.requests || nextProps.loading !== this.props.loading;
  }

  render() {
    const { error, loading, settings } = this.props;
    const languageDictionary = this.props.languageDictionary || {};

    if (!error && this.props.requests.size === 0) {
      return <div>{languageDictionary.norequestsMessage || 'No requests found'}</div>;
    }

    const requests = this.props.requests.toJS();
    return (
      <LoadingPanel show={loading} animationStyle={{ paddingTop: '5px', paddingBottom: '5px' }}>
        <Error title={languageDictionary.errorTitle}
               message={getErrorMessage(languageDictionary, error, settings.errorTranslator)}/>
        <Table>
          <TableHeader>
            <TableColumn width="20%">{languageDictionary.requestEmailColumnHeader || 'Email'}</TableColumn>
            <TableColumn width="12%">{languageDictionary.connection || 'Connection'}</TableColumn>
            <TableColumn width="12%">{languageDictionary.requestCreatedAtColumnHeader || 'Created at'}</TableColumn>
            <TableColumn width="15%"></TableColumn>
          </TableHeader>
          <TableBody>
            {
              requests.map((request, index) => {
                request.time_ago = moment(request.created_at)
                  .locale(languageDictionary.momentLocale || 'en')
                  .fromNow();

                return (
                  <TableRow key={index}>
                    <TableTextCell>{request.email}</TableTextCell>
                    <TableTextCell>{request.connection}</TableTextCell>
                    <TableTextCell>{request.time_ago}</TableTextCell>
                    <TableTextCell>
                      <ButtonToolbar className="pull-right">
                        <Button
                          bsSize="small"
                          bsStyle="primary"
                          onClick={() => this.props.onAccept(request._id, 'accept')}
                          disabled={this.props.requests.loading}
                        >
                          <i
                            className="icon icon-budicon-390"></i> {languageDictionary.logsRefreshButtonText || 'Accept'}
                        </Button>
                        <Button
                          bsSize="small"
                          disabled={this.props.requests.loading}
                          onClick={() => this.props.onDecline(request._id, 'decline')}
                        >
                          <i
                            className="icon icon-budicon-389"></i> {languageDictionary.logsLoadMoreButtonText || 'Decline'}
                        </Button>
                      </ButtonToolbar>
                    </TableTextCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </LoadingPanel>
    );
  }
};
