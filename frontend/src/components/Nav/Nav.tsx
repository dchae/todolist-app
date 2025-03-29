import "./Nav.css";

export const NavButton = () => {
  return (
    <>
      <input type="checkbox" id="modal-toggle" className="hidden-checkbox" />
      <label htmlFor="sidebar-toggle">Menu</label>
    </>
  );
};

const Nav = () => {
  return (
    <>
      <input type="checkbox" id="sidebar-toggle" className="hidden-checkbox" />
      <nav>
        <section className="all-groups">
          <h2 id="all-group" className="group current" data-group="all">
            <a href="#">All Todos</a>
            <span className="badge">0</span>
          </h2>
          <ul className="all-date-groups">
            <li className="group" data-group={null}>
              <a href="#">TODO GROUP</a>
              <span className="badge">9</span>
            </li>
          </ul>
        </section>
        <section className="completed-groups">
          <h2 id="all-completed-group" className="group" data-group="completed">
            <a href="#">Completed</a>
            <span className="badge">0</span>
          </h2>
          <ul className="completed-date-groups"></ul>
        </section>
      </nav>
    </>
  );
};

export default Nav;
