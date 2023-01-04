import { useState, createContext } from 'react'

const SearchContext = createContext();

const SearchProvider = ({ children }) => {

    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchUserName, setSearchUserName] = useState('');
    const [searchFullName, setSearchFullName] = useState('');
    const [searchPhoneNumber, setSearchPhoneNumber] = useState('');

    const value = {
        searchId,
        setSearchId,
        searchName,
        setSearchName,
        searchUserName,
        setSearchUserName,
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