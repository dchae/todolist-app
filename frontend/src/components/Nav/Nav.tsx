import "./Nav.css";
import { TodosHook, DateStr, Filter } from "../../types.ts";

// TODO: fix nav button
export const NavButton = () => {
  return <label htmlFor="sidebar-toggle">Menu</label>;
};

interface NavProps {
  todos: TodosHook;
}

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

const Nav = ({ todos }: NavProps) => {
  const groups = Object.entries(todos.datesTally()) as Array<[DateStr, number]>;
  const completedGroups = Object.entries(todos.datesTally(true)) as Array<
    [DateStr, number]
  >;
  sortGroups(groups);
  sortGroups(completedGroups);

  const getGroupClass = (filter: Filter) => {
    const classList = ["group"];
    if (
      filter.date === todos.filter.date &&
      filter.completedOnly === todos.filter.completedOnly
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
            onClick={() => todos.setFilter({})}
          >
            <a href="#">All Todos</a>
            <span className="badge">{todos.all.length}</span>
          </h2>

          <ul className="all-date-groups">
            {groups.map(([name, count]) => {
              const filter = { date: name };
              return (
                <li
                  key={name}
                  className={getGroupClass(filter)}
                  onClick={() => todos.setFilter(filter)}
                >
                  <a href="#">{name}</a>
                  <span className="badge">{count}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="completed-groups">
          <h2
            id="all-completed-group"
            className={getGroupClass({ completedOnly: true })}
            onClick={() => todos.setFilter({ completedOnly: true })}
          >
            <a href="#">Completed</a>
            <span className="badge">{todos.allCompleted().length}</span>
          </h2>
          <ul className="completed-date-groups">
            {completedGroups.map(([name, count]) => {
              const filter: Filter = { date: name, completedOnly: true };
              return (
                <li
                  key={name}
                  className={getGroupClass(filter)}
                  onClick={() => todos.setFilter(filter)}
                >
                  <a href="#">{name}</a>
                  <span className="badge">{count}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </nav>
    </>
  );
};

export default Nav;
