import './style.css';

const Quote = ({ quote, classes, color }) => (
  <div className={`quote ${classes}`} style={{ color: color }}>
    {quote.text && (
      <>
        <QuoteText text={quote.text} />
        <QuoteAuthor author={quote.author} />
      </>
    )}
  </div>
);

const QuoteText = ({ text }) => (
  <div className="quote-text" id="text">
    <span>"</span>
    {text}
    <span>"</span>
  </div>
);

const QuoteAuthor = ({ author }) => (
  <div className="quote-author" id="author">
    - {author}
  </div>
);

export default Quote;
