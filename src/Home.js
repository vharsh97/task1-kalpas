import React, { useEffect, useState } from "react";
import "./App.css";
import Listview from "./Listview";
import Cardview from "./Cardview";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";

function Home({ view, openModal}) {
  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [pageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * (view === "list" ? 5 : 6);
  const indexOfFirstItem = indexOfLastItem - (view === "list" ? 5 : 6);
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <h4
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </h4>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li onClick={handleNextbtn}>
        {" "}
        <MoreHorizRoundedIcon />{" "}
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li onClick={handlePrevbtn}>
        {" "}
        <MoreHorizRoundedIcon />{" "}
      </li>
    );
  }

  useEffect(() => {
    fetch("https://api.first.org/data/v1/news")
      .then((response) => response.json())
      .then((json) => setData(json.data));
  }, []);

  return (
    <div className="currentNews">
      {view === "list" ? (
        <Listview
          view={view}
          data={currentItems}
          handleClickView={(modelOpen) => openModal(!modelOpen)}
        />
      ) : (
        <Cardview
          view={view}
          data={currentItems}
          handleClickView={(modelOpen) => openModal(!modelOpen)}
        />
      )}

      {/* Pagination */}

      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            <ChevronLeftRoundedIcon />
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            <ChevronRightRoundedIcon />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Home;
