import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  Icon: IconType;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ Icon, path }) => {
  return (
    <li>
      <NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
        <Icon />
      </NavLink>
    </li>
  );
};

export default NavItem;
