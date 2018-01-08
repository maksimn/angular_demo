import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SearchBlockComponent from '../../components/photos/SearchBlock';
import { photoActionCreators } from '../../actions/photos';
import { AppState } from '../../store/AppState';

interface SearchBlockProps {
    setPhotosSearchParam: (searchParam: string) => void;
    history: any;
    match: any;
    searchParam: string;
}

interface State {}

class SearchBlock extends React.Component<SearchBlockProps, State> {
    constructor(props: SearchBlockProps) {
        super(props);

        this.onSearchParamChange = this.onSearchParamChange.bind(this);
    }

    componentWillMount() {
        const { searchParam } = this.props.match.params;

        if (searchParam) {
            this.props.setPhotosSearchParam(searchParam);
        }
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
                   searchParam= { this.props.searchParam }
                   onSearchParamChange={ this.onSearchParamChange } />;
    }
}

const SearchBlockConnected = connect(
    (state: AppState) => ({ searchParam: state.photos.searchParam }),
    (dispatch) => ({
        setPhotosSearchParam: (searchParam: string) => {
            dispatch(photoActionCreators.setPhotosSearchParam(searchParam));
        }
    })
)(SearchBlock);

export default () => (
    <Switch>
        <Route exact path="/photos" component={ SearchBlockConnected } />
        <Route exact path="/photos/searching/:searchParam" component={ SearchBlockConnected } />
    </Switch>
);