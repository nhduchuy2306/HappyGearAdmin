import { useState, createContext } from 'react'

const SearchContext = createContext();

const SearchProvider = ({ children }) => {

    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchUsername, setSearchUsername] = useState('');
    const [searchFullName, setSearchFullName] = useState('');
    const [searchPhoneNumber, setSearchPhoneNumber] = useState('');

    const value = {
        searchId,
        setSearchId,
        searchName,
        setSearchName,
        searchUsername,
        setSearchUsername,
        searchFullName,
        setSearchFullName,
        searchPhoneNumber,
        setSearchPhoneNumber,
    }

    return (
        <>
            <SearchContext.Provider value={value}>
                {children}
            </SearchContext.Provider>
        </>
    )

}

export { SearchContext, SearchProvider }