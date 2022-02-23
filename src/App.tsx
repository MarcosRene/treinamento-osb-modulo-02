import { useState } from 'react';

import {
  FiLink as LinkIcon,
  FiUser as UserIcon,
  FiBook as BookIcon,
  FiSearch as SearchIcon,
} from 'react-icons/fi';

import api from './services/api';

import Spinner from './components/Spinner';

import './global.css';
interface IResult {
  author: string;
  title: string;
  url: string;
}

function App() {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<IResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSearch(query: string) {
    try {
      setIsLoading(true);

      const { data } = await api.get(`search?query=${query}`);
      setData(data.hits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="content">
        <h3>{process.env.REACT_APP_APP_NAME}</h3>

        <div className="search-group">
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="input"
          />
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              handleSearch(search);
            }}
            className="button"
          >
            {isLoading ? <Spinner /> : <SearchIcon />}
          </button>
        </div>

        <ul className="card-list">
          {data.map(({ author, title, url }) => {
            return (
              <li>
                <span>
                  <UserIcon />
                  {author ? author : '-'}
                </span>
                <span>
                  <BookIcon />
                  {title ? title : '-'}
                </span>
                <a href={url} rel="noreferrer noopanner" target="_blank">
                  <LinkIcon />
                  {url ? url : '-'}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
