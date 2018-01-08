import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SearchBlockComponent from '../../components/photos/SearchBlock';
import { photoActionCreators } from '../../actions/photos';

interface SearchBlockProps {
    setPhotosSearchParam: (searchParam: string) => void;
    history: any;
}

interface State {}

class SearchBlock extends React.Component<SearchBlockProps, State> {
    constructor(props: SearchBlockProps) {
        super(props);

        this.onSearchParamChange = this.onSearchParamChange.bind(this);
    }

    onSearchParamChange(searchParam: string) {
        const searchParamTrimmed = searchParam.trim(),
            { setPhotosSearchParam, history } = this.props;

        if (searchParamTrimmed) {
            setPhotosSearchParam(searchParamTrimmed);
            history.push(`/photos/searching/${searchParamTrimmed}`);
        } else {
            setPhotosSearchParam('');
            history.push('/photos');
        }
    }

    render() {
        return <SearchBlockComponent
                   onSearchParamChange={ this.onSearchParamChange } />;
    }
}

const SearchBlockConnected = connect(
    undefined,
    (dispatch) => ({
        setPhotosSearchParam: (searchParam: string) => {
            dispatch(photoActionCreators.setPhotosSearchParam(searchParam));
        }
    })
)(SearchBlock);

export default () => (<Route path="/photos" component={ SearchBlockConnected } />);