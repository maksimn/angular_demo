import * as React from 'react';
import { connect } from 'react-redux';

import IndexView from '../../components/pages/IndexView';
import { AppState } from '../../store/AppState';

interface IndexProps {
    isUserAuthorized: boolean;
}

interface IndexState {}

class Index extends React.Component<IndexProps, IndexProps> {
    constructor(props: IndexProps) {
        super(props);
    }

    render() {
        const { isUserAuthorized } = this.props;

        return <IndexView isUserAuthorized={ isUserAuthorized } />;
    }
}

export default connect(
    (state: AppState) => ({
        isUserAuthorized: state.auth.user !== null
    })
)(Index);