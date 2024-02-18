import { React, useState } from "react";
import Card from "./Card/Card.js";
import Pagination from "../Pagination/Pagination.js";

function BigCard(props) {
  return (
    <div id={props.type}>
      <div className="text-center font-bold text-xl">
        <span>{`${props.type[0].toUpperCase() + props.type.slice(1)}s`}</span>
      </div>
      <div className={`flex justify-center flex-wrap m-3`}>
        {props.data.map((item, key) => (
          <Card key={key} item={item} type={props.type} />
        ))}
      </div>
      {props.type !== "favorite" ? (
        <Pagination
          page={props.page}
          setPage={props.setPage}
          type={props.type}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default BigCard;