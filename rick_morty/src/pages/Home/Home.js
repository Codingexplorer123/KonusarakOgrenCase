import { useEffect, useState } from "react";
import BigCard from "../../components/BigCard/BigCard";
import axios from "axios";
import Character from "../Characters/Characters";
import Locations from "../Locations/Locations";
import Episodes from "../Episodes/Episodes";

function Home() {
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [pageEp, setPageEp] = useState([1, 0]);
  const [pageLoc, setPageLoc] = useState([1, 0]);

  useEffect(() => {
    handleGetEpisodes();
  }, [pageEp[0]]);
  useEffect(() => {
    handleGetLocations();
  }, [pageLoc[0]]);

  const handleGetEpisodes = () => {
    axios(`${process.env.REACT_APP_ENDPOINT}episode/?page=${pageEp[0]}`).then(
      function (response) {
        setEpisodes(response.data.results);
        setPageEp([pageEp[0], response.data.info.pages]);
      }
    );
  };
  const handleGetLocations = () => {
    axios(
      `${process.env.REACT_APP_ENDPOINT}location/?page=${pageLoc[0]}`
    ).then(function (response) {
      setLocations(response.data.results);
      setPageLoc([pageLoc[0], response.data.info.pages]);
    });
  };

  // //charactersIDs.length == 6 olana kadar 1 ile 826 arasında rastgele sayı üret ve charactersIDs arrayine ekle
  // if (charactersIDs.length < 6) {
  //   let randomNumber = Math.floor(Math.random() * 823) + 3;
  //   if (!charactersIDs.includes(randomNumber)) {
  //     setCharactersIDs([...charactersIDs, randomNumber]);
  //   }
  // }

  // //episodes.length == 6 olana kadar 1 ile 51 arasında rastgele sayı üret ve episodes arrayine ekle
  // if (episodes.length < 11) {
  //   let randomNumber = Math.floor(Math.random() * 51) + 1;
  //   if (!episodes.includes(randomNumber)) {
  //     setEpisodes([...episodes.sort(), randomNumber]);
  //   }
  // }

  // //locations.length == 6 olana kadar 1 ile 128 arasında rastgele sayı üret ve locations arrayine ekle
  // if (locations.length < 11) {
  //   let randomNumber = Math.floor(Math.random() * 126) + 1;
  //   if (!locations.includes(randomNumber)) {
  //     setLocations([...locations.sort(), randomNumber]);
  //   }
  // }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <Character/>
        <Episodes
        />
        <Locations/>
      </div>
    </div>
  );
}

export default Home;