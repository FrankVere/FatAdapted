import React from "react";
import styled from "styled-components";

const Options = ({ list, setQuery, query, defaultQuery }) => {
  const onChangeHandler = (e) => {
    let newQuery = { ...query };
    newQuery.cuisine = e.target.value;
    setQuery(newQuery);
  };

  return (
    <div>
      <select onChange={onChangeHandler}>
        <option>{defaultQuery}</option>
        {list.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
    </div>
  );
};
export default Options;
