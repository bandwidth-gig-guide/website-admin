import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import camelcaseKeys from "camelcase-keys";
import getConfig from "next/config";
import styles from './SearchBar.module.css'

interface SearchResultItem {
  id: string;
  title: string;
}

interface SearchResult {
  event: SearchResultItem[];
  artist: SearchResultItem[];
  venue: SearchResultItem[];
}

const SearchBar = () => {
  const router = useRouter();
  const api = getConfig().publicRuntimeConfig.SERVICE_SEARCH_API_URL
  const inputRef = useRef<HTMLInputElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)
  const [searchResult, setSearchResult] = useState<SearchResult>({ event: [], artist: [], venue: [] });
  const [searchString, setSearchString] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const hasResults = searchResult.event.length > 0 || searchResult.artist.length > 0 || searchResult.venue.length > 0;
  const isDropdownOpen = hasResults && searchString && isFocused;


  const handleFocus = () => {
    inputRef.current?.focus()
    componentRef.current?.focus()
    setIsFocused(true);
  }

  const handleBlur = () => {
    inputRef.current?.blur();
    componentRef.current?.blur();
    setIsFocused(false);
  }

  const handleClearSearch = () => {
    setSearchString('');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  }

  const handleSelectItem = async (type: string, id: string) => {
    await router.push(`/${type}/${id}`);
    handleBlur();
  }


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        handleBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    axios.get(`${api}/all/id-and-title`, { params: { searchString } })
      .then(response => { setSearchResult(camelcaseKeys(response.data, { deep: true })) });
  }, [searchString]);


  return (
    <div className={styles.wrapper} ref={componentRef} onClick={handleFocus}>
      <label htmlFor="searchBar">Search Bar</label>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          id="searchBar"
          name="searchBar"
          type="text"
          value={searchString}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
        {searchString ? (
          <img src="/circle-cross.svg" alt="Clear Results Icon" onClick={handleClearSearch} />
        ) : (
          <img src="/search.svg" alt="Search Icon" onClick={handleFocus} />
        )}
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          {searchResult.event.length > 0 &&
            <div className={styles.dropdownSection}>
              <h2>Event</h2>
              {searchResult.event.map(item => (
                <p
                  key={`event-${item.id}`}
                  className={styles.resultRow}
                  onClick={() => handleSelectItem('event', item.id)}
                >
                  {item.title}
                </p>
              ))}
            </div>
          }

          {searchResult.artist.length > 0 &&
            <div className={styles.dropdownSection}>
              <h2>Artist</h2>
              {searchResult.artist.map(item => (
                <p
                  key={`artist-${item.id}`}
                  className={styles.resultRow}
                  onClick={() => handleSelectItem('artist', item.id)}
                >
                  {item.title}
                </p>
              ))}
            </div>
          }

          {searchResult.venue.length > 0 &&
            <div className={styles.dropdownSection}>
              <h2>Venue</h2>
              {searchResult.venue.map(item => (
                <p
                  key={`venue-${item.id}`}
                  className={styles.resultRow}
                  onClick={() => handleSelectItem('venue', item.id)}
                >
                  {item.title}
                </p>
              ))}
            </div>
          }

        </div>
      )}
    </div>
  )
}

export default SearchBar