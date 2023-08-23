import './BigTitle.css';
import Title from '../Title/Title';

function BigTitle({ text, sectionClassName }) {
  const bigTitleClass = `big-title ${sectionClassName}`;
  return <Title text={text} additionalClass={bigTitleClass} />;
}

export default BigTitle;
