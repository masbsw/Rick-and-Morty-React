export default function FilterSection({ icon, placeholder, value, onChange }) {
  return (
    <section className="filter">
      <div className="filter__container">
        {icon}
        <div className="filter__container">
          <div className="filter__item">
            <img className="filter__icon" src="/src/assets/img/filter_icon.svg" alt="" />
            <input 
              id="name_filter" 
              type="text" 
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}