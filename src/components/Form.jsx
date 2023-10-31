// Define priceOption and productType constant variables.
export const priceOption = {
  oneToTen: '1-10',
  tenToFifteen: '10-15',
  fifteenToThirty: '15-30',
};

export const productType = {
  eyeshadow: 'eyeshadow',
  eyeliner: 'eyeliner',
  powder: 'powder',
  foundation: 'foundation',
  lipstick: 'lipstick',
};
// Render a form element with onSubmit event listener calling props.handleFormSubmit
const Form = (props) => (
  <form onSubmit={props.handleFormSubmit}>
    {/* Render a div element with class box */}
    <div className="box">
      {/* Render two select elements inside the div element with className
      orientationPicker */}
      <select
        value={props.userChoice}
        className="orientationPicker"
        onChange={props.handleFormChange}
      >
        {Object.entries(productType).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
      {/* Render two select elements with classes orientationPicker: */}
      <select
        value={props.userPrice}
        className="orientationPicker"
        onChange={props.handlePriceChange}
      >
        <option value={priceOption.oneToTen}>$1-10</option>
        <option value={priceOption.tenToFifteen}>$10-$15</option>
        <option value={priceOption.fifteenToThirty}>$15 and up</option>
      </select>
      <button className="submit">Submit</button>
    </div>
  </form>
);

export default Form;
