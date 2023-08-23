import './Title.css';

function Title({ text, additionalClass }) {
  const titleClass = `title ${additionalClass}`;
  return <h2 className={titleClass}>{text}</h2>;
}

export default Title;
