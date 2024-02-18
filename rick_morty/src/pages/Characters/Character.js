import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BigCard from "../../components/BigCard/BigCard.js";

import axios from "axios";

function Character() {
  let { charid } = useParams();

  const [characters, setCharacters] = useState([]);
  const [pageChar, setPageChar] = useState([1, 0]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetCharacters();
  }, [pageChar[0]]);

  const handleGetCharacters = () => {
    setLoading(true);
    try {
      axios(
        `${process.env.REACT_APP_ENDPOINT}character/?page=${pageChar[0]}`
      ).then(function (response) {
        setCharacters(response.data.results);
        setPageChar([pageChar[0], response.data.info.pages]);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {charid == undefined && !loading ? (
        <BigCard
          page={pageChar}
          setPage={setPageChar}
          data={characters}
          type={"character"}
        />
      ) : (
        //all characters ********************************
        <div className="characters relative border-2 border-indigo-50 border-b-4 border-b-purple-600 rounded-lg m-3">
          {charid}
        </div> //all characters endpoint ********************************
      )}
    </div>
  );
}

export default Character;