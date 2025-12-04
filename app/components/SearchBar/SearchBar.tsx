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
  const api = getConfig().publicRuntimeConfig.SERVICE_ADMIN_API_URL
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchResult, setSearchResult] = useState<SearchResult>({ event: [], artist: [], venue: [] });
  const [searchString, setSearchString] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${api}/search/all/id-and-title`, {
      params: { searchString }
    })
      .then(response => { setSearchResult(camelcaseKeys(response.data, { deep: true })) });
  }, [searchString]);

  const handleImageClick = () => {
    inputRef.current?.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  }

  const handleRowClick = (type: string, id: string) => {

    router.push(`/${type}/${id}`);
  }

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  }

  const hasResults = searchResult.event.length > 0 || searchResult.artist.length > 0 || searchResult.venue.length > 0;

  return (
    <div className={styles.wrapper}>
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
          onBlur={handleBlur}
        />
        <img src="/search.svg" alt="" onClick={handleImageClick} />
      </div>

      {hasResults && searchString && isFocused && (
        <div className={styles.dropdown}>
          {searchResult.event.length > 0 &&
            <div className={styles.dropdownSection}>
              <h2>Event</h2>
              {searchResult.event.map(item => (
                <p
                  key={`event-${item.id}`}
                  className={styles.resultRow}
                  onClick={() => handleRowClick('event', item.id)}
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
                  onClick={() => handleRowClick('artist', item.id)}
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
                  onClick={() => handleRowClick('venue', item.id)}
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