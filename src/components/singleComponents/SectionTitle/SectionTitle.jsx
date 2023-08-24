import Title from '../Title/Title';

import './SectionTitle.css';

function SectionTitle({ text }) {
  return <Title text={text} additionalClass='section-title' />;
}

export default SectionTitle;
