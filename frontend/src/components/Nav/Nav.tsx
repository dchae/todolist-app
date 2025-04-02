import "./Nav.css";
import { Todo, DateStr, Filter } from "../../types.ts";
import utils from "../../utils.ts";
import NavItem from "../NavItem";

export const NavButton = () => {
  return <label htmlFor="sidebar-toggle">Menu</label>;
};

const sortGroups = (groups: Array<[DateStr, number]>) => {
  const dateSort = (a: [DateStr, number], b: [DateStr, number]) => {
    const names = [a, b].map((x) => x[0]);
    const [[aMonth, aYear], [bMonth, bYear]] = names.map((name) =>
      name.split("/"),
    );

    return aYear === bYear
      ? aMonth.localeCompare(bMonth)
      : (aYear ?? "").localeCompare(bYear ?? "");
  };
  return groups.sort(dateSort);
};

const getNavGroups = (todos: Todo[]) => {
  const groups = Object.entries(utils.datesTally(todos)) as Array<
    [DateStr, number]
  >;
  const completedGroups = Object.entries(
    utils.datesTally(todos, true),
  ) as Array<[DateStr, number]>;

  sortGroups(groups);
  sortGroups(completedGroups);

  return [groups, completedGroups];
};

interface NavProps {
  todos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const Nav = ({ todos, filter, setFilter }: NavProps) => {
  const [groups, completedGroups] = getNavGroups(todos);
  const getGroupClass = (curFilter: Filter) => {
    const classList = ["group"];
    if (
      curFilter.date === filter.date &&
      curFilter.completedOnly === filter.completedOnly
    ) {
      classList.push("current");
    }
    return classList.join(" ");
  };

  return (
    <>
      <input type="checkbox" id="sidebar-toggle" className="hidden-checkbox" />
      <nav>
        <section className="all-groups">
          <h2
            id="all-group"
            className={getGroupClass({})}
            onClick={() => setFilter({})}
          >
            <a href="#">All Todos</a>
            <span className="badge">{todos.length}</span>
          </h2>

          <ul className="all-date-groups">
            {groups.map(([name, count]) => {
              return (
                <NavItem
                  key={name}
                  name={name}
                  count={count}
                  setFilter={setFilter}
                  getGroupClass={getGroupClass}
                />
              );
            })}
          </ul>
        </section>

        <section className="completed-groups">
          <h2
            id="all-completed-group"
            className={getGroupClass({ completedOnly: true })}
            onClick={() => setFilter({ completedOnly: true })}
          >
            <a href="#">Completed</a>
            <span className="badge">{utils.allCompleted(todos).length}</span>
          </h2>
          <ul className="completed-date-groups">
            {completedGroups.map(([name, count]) => {
              return (
                <NavItem
                  key={name}
                  completedOnly={true}
                  name={name}
                  count={count}
                  setFilter={setFilter}
                  getGroupClass={getGroupClass}
                />
              );
            })}
          </ul>
        </section>
      </nav>
    </>
  );
};

export default Nav;
