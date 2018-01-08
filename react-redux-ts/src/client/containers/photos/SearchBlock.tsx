import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/AppState';
import SearchBlockComponent from '../../components/photos/SearchBlock';
import Photo from '../../store/Photo';
import { photoActionCreators } from '../../actions/photos';

interface Props {
    setPhotosSearchParam: (searchParam: string) => void;
    resetPhotosSearchParam: () => void;
    history: any;
}

interface State {}

class SearchBlock extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onSearchParamChange = this.onSearchParamChange.bind(this);
    }

    onSearchParamChange(searchParam: string) {
        const searchParamTrimmed = searchParam.trim();

        if (searchParamTrimmed) {
            this.props.setPhotosSearchParam(searchParamTrimmed);
            this.props.history.push(`/photos/searching/${searchParamTrimmed}`);
        } else {
            this.props.resetPhotosSearchParam();
            this.props.history.push('/photos');
        }
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
        },
        resetPhotosSearchParam: () => {
            dispatch(photoActionCreators.resetPhotosSearchParam());
        }
    })
)(SearchBlock);