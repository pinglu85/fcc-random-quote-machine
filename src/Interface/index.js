import './style.css';

const Interface = ({ onRequestNewQuote, quote, color }) => (
  <div className="interface">
    <ShareButtons quote={quote} color={color} />
    <NewQuoteButton onRequestNewQuote={onRequestNewQuote} color={color} />
  </div>
);

const ShareButtons = ({ quote, color }) => {
  const twitterQuery =
    encodeURIComponent(`"${quote.text}"`) +
    ' ' +
    encodeURIComponent(quote.author);

  const tumblrCaption = encodeURIComponent(quote.author);
  const tumblrContent = encodeURIComponent(quote.text);
  const tumblrCanonicalUrl = encodeURIComponent(
    'https://www.tumblr.com/buttons&shareSource=tumblr_share_button'
  );

  return (
    <div class="share-button-container">
      <ShareButton
        url={`https://twitter.com/intent/tweet?hashtags=quote&related=freecodecamp&text=${twitterQuery}`}
        brand="twitter"
        id="tweet-quote"
        color={color}
      />
      <ShareButton
        url={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${tumblrCaption}&content=${tumblrContent}&canonicalUrl=${tumblrCanonicalUrl}`}
        brand="tumblr"
        color={color}
      />
    </div>
  );
};

const ShareButton = ({ url, id, brand, color }) => (
  <a className="share-button" href={url} id={id} style={{ background: color }}>
    <i className={`fab fa-${brand}`}></i>
  </a>
);

const NewQuoteButton = ({ onRequestNewQuote, color }) => (
  <button
    type="button"
    id="new-quote"
    onClick={onRequestNewQuote}
    style={{ background: color }}
  >
    New quote
  </button>
);

export default Interface;
