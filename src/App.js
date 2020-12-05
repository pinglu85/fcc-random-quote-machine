import { useReducer, useEffect, useCallback } from 'react';

import Quote from './Quote/index';
import Interface from './Interface/index';
import './App.css';

const API_ENDPOINT = 'https://type.fit/api/quotes';

const QUOTE_FETCH_INIT = 'QUOTE_FETCH_INIT';
const QUOTE_FETCH_SUCCESS = 'QUOTE_FETCH_SUCCESS';
const QUOTE_FETCH_FAILURE = 'QUOTE_FETCH_FAILURE';

const COLORS = [
  '#342224',
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#aa630d',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#472E32',
  '#847f6b',
  '#77B1A9',
  '#73A857',
];

const quoteReducer = (state, action) => {
  switch (action.type) {
    case QUOTE_FETCH_INIT:
      return {
        ...state,
        color: action.payload,
        isLoading: true,
        isError: false,
      };
    case QUOTE_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case QUOTE_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error('Should not reach here');
  }
};

const App = () => {
  const [state, dispatch] = useReducer(quoteReducer, {
    data: {},
    color: COLORS[0],
    isLoading: false,
    isError: false,
  });

  const fetchQuote = useCallback(() => {
    const colorIndex = Math.floor(Math.random() * COLORS.length);

    dispatch({ type: QUOTE_FETCH_INIT, payload: COLORS[colorIndex] });
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((result) => {
        const randomIndex = Math.floor(Math.random() * result.length);
        const quote = {
          text: result[randomIndex].text,
          author: result[randomIndex].author || 'Unknown',
        };
        dispatch({ type: QUOTE_FETCH_SUCCESS, payload: quote });
      })
      .catch(() => {
        dispatch({ type: QUOTE_FETCH_FAILURE });
      });
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <div className="container" style={{ backgroundColor: state.color }}>
      <div className="quote-box" id="quote-box">
        <div className="quote">
          {state.isError ? (
            <p>Something went wrong ...</p>
          ) : (
            <Quote
              quote={state.data}
              classes={state.isLoading ? 'fade-out' : 'fade-in'}
              color={state.color}
            />
          )}
        </div>
        <Interface
          onRequestNewQuote={() => fetchQuote()}
          quote={state.data}
          color={state.color}
        />
      </div>
      <footer className="footer">by Ping</footer>
    </div>
  );
};

export default App;
