import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  Icon: IconType;
  path: string;
  userId?: string;
}

const NavItem: React.FC<NavItemProps> = ({ Icon, path, userId }) => {
  const finalPath = userId && path.includes(':userId') ? path.replace(':userId', userId) : path;
  return (
    <li>
      <NavLink to={finalPath} className={({ isActive }) => (isActive ? 'active' : '')}>
        <Icon />
      </NavLink>
    </li>
  );
};

export default NavItem;
