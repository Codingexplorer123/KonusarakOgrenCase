import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BigCard from "../../components/BigCard/BigCard.js";

import axios from "axios";

function Locations() {
  let { locationid } = useParams();

  const [locations, setLocations] = useState([]);
  const [pageLoc, setPageLoc] = useState([1, 0]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetLocations();
  }, [pageLoc[0]]);

  const handleGetLocations = () => {
    setLoading(true);
    try {
      axios(
        `${process.env.REACT_APP_ENDPOINT}location/?page=${pageLoc[0]}`
      ).then(function (response) {
        setLocations(response.data.results);
        setPageLoc([pageLoc[0], response.data.info.pages]);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {locationid == undefined && !loading ? (
        <BigCard
          page={pageLoc}
          setPage={setPageLoc}
          data={locations}
          type={"location"}
        />
      ) : (
        //all characters ********************************
        <div className="characters relative border-2 border-indigo-50 border-b-4 border-b-purple-600 rounded-lg m-3">
          {locationid}
        </div> //all characters endpoint ********************************
      )}
    </div>
  );
}

export default Locations;