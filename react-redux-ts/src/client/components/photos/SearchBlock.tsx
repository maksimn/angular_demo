import * as React from 'react';
import styles from './SearchBlock.styles';

interface SearchBlockProps {
    onSearchParamChange: (searchParam: string) => void;
    searchParam: string;
}

const SearchBlock: React.StatelessComponent<SearchBlockProps> = props => {
    const onSearchParamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onSearchParamChange(event.target.value);
    };
    const { searchParam } = props;

    return (
        <div style={ styles }>
            <h4>
                Поиск:
                <input type="text" onChange={ onSearchParamChange } value={ searchParam } />
            </h4>
        </div>
    );
};

export default SearchBlock;