import * as React from 'react';
import { connect } from 'react-redux';

import IndexView from '../../components/pages/IndexView';
import { AppState } from '../../store/AppState';

interface IndexProps {
    isUserAuthorized: boolean;
}

const Index: React.StatelessComponent<IndexProps> = (props) =>
    <IndexView isUserAuthorized={ props.isUserAuthorized } />;

export default connect(
    (state: AppState) => ({
        isUserAuthorized: state.auth.user !== null
    })
)(Index);