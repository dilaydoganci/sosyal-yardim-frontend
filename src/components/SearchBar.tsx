import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (tckn: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [tckn, setTckn] = useState<string>('');

    const handleSearch = () => {
        if (tckn) {
            onSearch(tckn);
        }
    };

    return (
        <div className="search-bar">
            <input 
                type="text"
                placeholder="TCKN Giriniz"
                value={tckn}
                onChange={(e) => setTckn(e.target.value)}
            />
            <button onClick={handleSearch}>Sorgula</button>
        </div>
    );
};

export default SearchBar;
