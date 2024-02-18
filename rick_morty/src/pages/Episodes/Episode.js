import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BigCard from "../../components/BigCard/BigCard.js";

import axios from "axios";

function Episodes() {
  let { episodeid } = useParams();

  const [episodes, setEpisodes] = useState([]);
  const [pageEp, setPageEp] = useState([1, 0]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetEpisodes();
  }, [pageEp[0]]);

  const handleGetEpisodes = () => {
    setLoading(true);
    try {
      axios(`${process.env.REACT_APP_ENDPOINT}episode/?page=${pageEp[0]}`).then(
        function (response) {
          setEpisodes(response.data.results);
          setPageEp([pageEp[0], response.data.info.pages]);
          setLoading(false);
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {episodeid == undefined && !loading ? (
        <BigCard
          page={pageEp}
          setPage={setPageEp}
          data={episodes}
          type={"episode"}
        />
      ) : (
        //all characters ********************************
        <div className="characters relative border-2 border-indigo-50 border-b-4 border-b-purple-600 rounded-lg m-3">
          {episodeid}
        </div> //all characters endpoint ********************************
      )}
    </div>
  );
}

export default Episodes;
