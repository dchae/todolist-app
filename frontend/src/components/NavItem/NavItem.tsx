import { DateStr, Filter } from "../../types.ts";

interface NavItemProps {
  name: DateStr;
  count: number;
  completedOnly?: true;
  setFilter: (filter: Filter) => void;
  getGroupClass: (filter: Filter) => string;
}

const NavItem = ({
  name,
  count,
  completedOnly,
  setFilter,
  getGroupClass,
}: NavItemProps) => {
  const filter: Filter = { date: name, completedOnly };

  return (
    <li className={getGroupClass(filter)} onClick={() => setFilter(filter)}>
      <a href="#">{name}</a>
      <span className="badge">{count}</span>
    </li>
  );
};

export default NavItem;
