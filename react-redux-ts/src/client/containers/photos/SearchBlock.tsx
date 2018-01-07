import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/AppState';
import SearchBlockComponent from '../../components/photos/SearchBlock';
import Photo from '../../store/Photo';
import { photoActionCreators } from '../../actions/photos';

interface Props {
    setPhotosSearchParam: (searchParam: string) => void;
}

interface State {}

class SearchBlock extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onSearchParamChange = this.onSearchParamChange.bind(this);
    }

    onSearchParamChange(searchParam: string) {
        this.props.setPhotosSearchParam(searchParam);
    }

    render() {
        return <SearchBlockComponent
                   onSearchParamChange={ this.onSearchParamChange } />;
    }
}

export default connect(
    undefined,
    (dispatch) => ({
        setPhotosSearchParam: (searchParam: string) => {
            dispatch(photoActionCreators.setPhotosSearchParam(searchParam));
        }
    })
)(SearchBlock);