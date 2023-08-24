import './ListItem.css';
import { NavLink } from 'react-router-dom';

function ListItem({
  isRedirectLink,
  isAnchorLink,
  link,
  text,
  additionalClass,

  children,
}) {
  const listItemClass = `list-item ${additionalClass}`;

  return (
    <li className={listItemClass}>
      {isRedirectLink && (
        <NavLink
          to={`${link}`}
          className={({ isActive }) =>
            `list-item__link${isActive ? ' list-item__link_active' : ''}`
          }
        >
          <span>{text}</span>
          {children}
        </NavLink>
      )}
      {isAnchorLink && (
        <a href={`#${link}`} className='list-item__link'>
          {text}
        </a>
      )}
      {!isRedirectLink && !isAnchorLink && (
        <a
          href={`${link}`}
          rel='noreferrer'
          target='_blank'
          className='list-item__link'
        >
          {text}
        </a>
      )}
    </li>
  );
}

export default ListItem;
