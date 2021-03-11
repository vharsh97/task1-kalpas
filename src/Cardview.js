import React from "react";
import ModalComponent from "./Modal";

const Cardview = ({ data, handleClickView, view }) => {
  const [singleNews, setSingleNews] = React.useState([]);
  const handleClick = (news) => {
    setSingleNews(news);
  };

  return (
    <div className="card">
      {data.map((news, index) => {
        return (
          <div
            className="cardview"
            key={index}
            onClick={() => handleClick(news)}
          >
            <h3>{news.title}</h3>
            <p className="summary">{news.summary}</p>
            <p className="publishDate">{news.published}</p>
            <ModalComponent
              view={view}
              link={singleNews.link}
              setClickOpen={(status) => handleClickView(!status)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cardview;
