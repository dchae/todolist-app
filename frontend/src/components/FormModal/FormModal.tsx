import "./FormModal.css";
import Modal from "../Modal";
import { FormData, FormDataAction } from "../../types.ts";

interface FormModalProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  formData: FormData;
  dispatch: (action: FormDataAction) => void;
}

const FormModal = ({ isOpen, setOpen, formData, dispatch }: FormModalProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Handling form submit...");
  };

  const handleValueChange = (e: React.SyntheticEvent) => {
    if (!("name" in e.target && "value" in e.target)) {
      throw new Error("Invalid value change target.");
    }

    const field = e.target.name;
    const newValue = e.target.value;
    // TODO: Used assertion here because narrowing would be unnecessarily annoying.
    // Consider using something like zod to parse.
    dispatch({ field, newValue } as FormDataAction);
  };

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      onClose={() => dispatch({ reset: true })}
    >
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
            <option defaultValue="">Day</option>
            {[...Array(31).keys()].map((i) => {
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
            <option defaultValue="">Month</option>
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
            <option defaultValue="">Year</option>
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
        <button type="button" className="mark-complete">
          Mark As Complete
        </button>
      </form>
    </Modal>
  );
};

export default FormModal;
