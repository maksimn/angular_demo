import * as React from 'react';

interface SearchBlockProps {
    onSearchParamChange: (searchParam: string) => void;
}

const SearchBlock: React.StatelessComponent<SearchBlockProps> = props => {
    const onSearchParamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onSearchParamChange(event.target.value);
    };

    return (
        <div className="search-block">
            <h4>
                Поиск: <input type="text" onChange={ onSearchParamChange } />
            </h4>
        </div>
    );
};

export default SearchBlock;