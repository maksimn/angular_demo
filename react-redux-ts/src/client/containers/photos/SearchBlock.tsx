import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/AppState';
import SearchBlockComponent from '../../components/photos/SearchBlock';
import Photo from '../../store/Photo';

interface Props {
    photoData: Photo[];
}

interface State {}

class SearchBlock extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onSearchParamChange = this.onSearchParamChange.bind(this);
    }

    onSearchParamChange(searchParam: string) {

    }

    render() {
        return <SearchBlockComponent
                   onSearchParamChange={ this.onSearchParamChange } />;
    }
}

export default connect(
    (state: AppState) => ({ photoData: state.photos.data })
)(SearchBlock);