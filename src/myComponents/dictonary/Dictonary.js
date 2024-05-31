import React, { useEffect, useState } from "react";
import "./dictonary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Dictonary = () => {
  const [value, setValue] = useState();
  const [data, setData] = useState([]);

  //search function

  console.log(data,"data")
  const search = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("no response", response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setData([]);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   const nounMeaning = data[0]?.meanings?.filter((items) => {
  //     return items.partOfSpeech === "noun";
  //   });
  //   const verbMeaning = data[0]?.meanings?.filter((items) => {
  //     return items.partOfSpeech === "verb";
  //   });
  //   const interjectionMeaning = data[0]?.meanings?.filter((items) => {
  //     return items.partOfSpeech === "interjection";
  //   });

  //  const link = data[0]?.phonetics?.map((items)=>{
  //     return items.audio[0]
  //  })
  //  const audio = link?.map((item)=>{
  //   console.log(item,"hhhh")
  //   return item
  //  });
  useEffect(() => {}, [data]);
  return (
    <>
      <div className="dictonaryContainer">
        <div className="dictonaryContent">
          <h1>Dictonary App</h1>

          <div className="search-div">
            <input
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="Enter any word"
            />
            <button className="search-btn" onClick={search}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="searchIcon"
              />
            </button>
          </div>

          {data?.map((item) => {
            console.log(item, "item");
            return (
              <div className="contentShow">
                <h1>
                  The Search Word :
                  <span style={{ color: "red" }}>{item.word}</span>
                </h1>

                <audio controls>
                  <source src={item.phonetics[0].audio} type="audio/mpeg" />
                </audio>

                {item.meanings.map((mean) => {
                  return (
                    <>
                      <h3>{mean.partOfSpeech}</h3>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>{mean.definitions[0].definition}</p>
                      </div>
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dictonary;
