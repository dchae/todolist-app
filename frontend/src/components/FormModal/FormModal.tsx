import "./FormModal.css";

const FormModal = () => {
  return (
    <dialog id="form-modal">
      <form action="#" method="post" data-id="">
        <label id="title-label" htmlFor="title">
          Title
        </label>

        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value=""
          minLength={3}
          required
        />

        <label id="date-label" htmlFor="date-day">
          Due Date
        </label>
        <fieldset id="date">
          <select id="date-day" name="day">
            <option value="" selected>
              Day
            </option>
            <option value="01">1</option>
            <option value="02">2</option>
            <option value="03">3</option>
            <option value="04">4</option>
            <option value="05">5</option>
            <option value="06">6</option>
            <option value="07">7</option>
            <option value="08">8</option>
            <option value="09">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>

          <span className="date-separator">/</span>

          <select name="month">
            <option value="" selected>
              Month
            </option>
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

          <select name="year">
            <option value="" selected>
              Year
            </option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
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
        ></textarea>

        <button type="submit" className="save">
          Save
        </button>
        <button type="button" className="mark-complete">
          Mark As Complete
        </button>
      </form>
    </dialog>
  );
};

export default FormModal;
