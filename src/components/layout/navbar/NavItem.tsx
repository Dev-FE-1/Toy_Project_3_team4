import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

import GradientIcon from '@/components/common/GradientIcon';

interface NavItemProps {
  Icon: IconType;
  path: string;
  userId?: string;
  iconType?: 'stroke' | 'fill';
}

const NavItem: React.FC<NavItemProps> = ({ Icon, path, userId, iconType = 'stroke' }) => {
  const finalPath = userId && path.includes(':userId') ? path.replace(':userId', userId) : path;
  return (
    <li>
      <NavLink to={finalPath}>
        {({ isActive }) =>
          isActive ? <GradientIcon Icon={Icon} size={24} type={iconType} /> : <Icon />
        }
      </NavLink>
    </li>
  );
};

export default NavItem;
