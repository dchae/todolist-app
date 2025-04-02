import { useState, useEffect, useMemo } from "react";
import "./FormModal.css";
import Modal from "../Modal";
import { Todo, NewTodoData, UpdateTodoData, Filter } from "../../types.ts";

interface FormModalProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  curTodo: Todo | null;
  setCurTodo: (todo: Todo | null) => void;
  updateTodo: (values: UpdateTodoData) => void;
  createTodo: (values: NewTodoData) => void;
  setFilter: (filter: Filter) => void;
}

const FormModal = ({
  isOpen,
  setOpen,
  curTodo,
  setCurTodo,
  updateTodo,
  createTodo,
  setFilter,
}: FormModalProps) => {
  const emptyFormData = useMemo<NewTodoData>(
    () => ({
      title: "",
      day: "",
      month: "",
      year: "",
      description: "",
    }),
    [],
  );
  const [formData, setFormData] = useState<NewTodoData>(emptyFormData);

  useEffect(() => {
    const data = curTodo ?? emptyFormData;
    setFormData({ ...data });
  }, [curTodo, emptyFormData]);

  const handleValueChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (curTodo) {
      updateTodo(formData);
    } else {
      createTodo(formData);
      setCurTodo(null);
      setFilter({});
    }
    setOpen(false);
  };

  const handleMarkComplete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (curTodo) {
      updateTodo({ id: curTodo.id, completed: true });
      setOpen(false);
    } else {
      alert("Todo has not been created yet");
    }
  };

  const daysInMonth = () => {
    const month = Number(formData.month) || 1;
    const year = Number(formData.year) || new Date().getFullYear();
    return new Date(year, month, 0).getDate();
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <label id="title-label" htmlFor="title">
          Title
        </label>

        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleValueChange}
          minLength={3}
          required
        />

        <label id="date-label" htmlFor="date-day">
          Due Date
        </label>
        <fieldset id="date">
          <select
            id="date-day"
            name="day"
            value={formData.day}
            onChange={handleValueChange}
          >
            <option value="">Day</option>
            {[...Array(daysInMonth()).keys()].map((i) => {
              const day = String(i + 1);
              const padded = day.padStart(2, "0");
              return (
                <option key={day} value={padded}>
                  {day}
                </option>
              );
            })}
          </select>

          <span className="date-separator">/</span>

          <select
            name="month"
            value={formData.month}
            onChange={handleValueChange}
          >
            <option value="">Month</option>
            <option value="01">Jan</option>
            <option value="02">Feb</option>
            <option value="03">Mar</option>
            <option value="04">Apr</option>
            <option value="05">May</option>
            <option value="06">Jun</option>
            <option value="07">Jul</option>
            <option value="08">Aug</option>
            <option value="09">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>

          <span className="date-separator">/</span>

          <select
            name="year"
            value={formData.year}
            onChange={handleValueChange}
          >
            <option value="">Year</option>
            {[...Array(25).keys()].map((i) => {
              const year = String(new Date().getFullYear() + i);
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </fieldset>

        <label id="description-label" htmlFor="description">
          {" "}
          Description{" "}
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleValueChange}
        ></textarea>

        <button type="submit" className="save">
          Save
        </button>
        <button
          type="button"
          className="mark-complete"
          onClick={handleMarkComplete}
        >
          Mark As Complete
        </button>
      </form>
    </Modal>
  );
};

export default FormModal;
