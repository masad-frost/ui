import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerRecords,
} from 'actions';
import { playerRecords } from 'reducers';
import Table from 'components/Table';
import Container from 'components/Container';
import strings from 'lang';
import playerRecordsColumns from './playerRecordsColumns';

const Records = ({ data, error, loading }) => (
  <Container title={strings.heading_records} error={error} loading={loading}>
    <Table columns={playerRecordsColumns} data={data} />
  </Container>
);

const getData = (props) => {
  props.getPlayerRecords(props.playerId, props.location.query);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Records {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerRecords.getRecordsList(state, playerId),
  error: playerRecords.getError(state, playerId),
  loading: playerRecords.getLoading(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerRecords: (playerId, options) => dispatch(getPlayerRecords(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
