import React from "react";
import styled from "styled-components";

const Options = ({ list, setQuery, query, defaultQuery, optionName }) => {
  const onChangeHandler = (e) => {
    let newQuery = { ...query };
    newQuery[optionName] = newQuery[optionName] + "," + e.target.value;
    setQuery(newQuery);
  };
  console.log(newQuery);
  return (
    <Wrapper>
      <div className="box">
        <select onChange={onChangeHandler}>
          <option disabled>{defaultQuery}</option>
          {list.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 10px;
`;

export default Options;
