import React from "react";

const AddressFields = ({ inputStyle, country, setCountry, city, setCity, zip, setZip }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <div>
        <label className="text-slate-700 dark:text-slate-300 font-medium">Country</label>
        <select
          className={inputStyle("country")}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Turkey">Turkey</option>
          <option value="USA">USA</option>
          <option value="Germany">Germany</option>
        </select>
      </div>

      <div>
        <label className="text-slate-700 dark:text-slate-300 font-medium">City</label>
        <input
          className={inputStyle("city")}
          placeholder="Istanbul"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div>
        <label className="text-slate-700 dark:text-slate-300 font-medium">ZIP Code</label>
        <input
          className={inputStyle("zip")}
          placeholder="34000"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </div>

    </div>
  );
};

export default AddressFields;
