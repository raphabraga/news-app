import React, { memo, useEffect, useState, useCallback } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Row, Col } from "antd";
import Api from "../api";
//import Action from "./components/Actions";
import { createMarkup } from "../utils";
import "./styles.css";

const Post = () => {
  const { id, subject } = useParams();
  const [post, setPost] = useState({});
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const renderImg = (image, description) => (
    <img src={image.url} alt={description} width="75%" />
  );

  const renderDescription = (description) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id) => history.push(`/${subject}/${id}`);

  const renderPost = (post, idx) => {
    const { title, image, description, id } = post;
    return (
      <Col span={12} key={`post_${idx}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)}></strong>
          </p>
          {image?.url
            ? renderImg(image, description)
            : renderDescription(description)}
        </article>
      </Col>
    );
  };

  const handleNews = useCallback((res) => {
    setNews(res[0]?.value);
    setPost(res[1]?.value);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      Api.getNews(subject),
      Api.getNewsById(subject, id),
    ]).then(handleNews);
  }, [id, subject, handleNews]);

  const { title, image, description, body, datePublished } = post;

  return loading ? (
    <div>Loading</div>
  ) : (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <p>{datePublished}</p>
          <h1 dangerouslySetInnerHTML={createMarkup(title)}></h1>
          {image && renderImg(image, description)}
          <p
            className="text"
            dangerouslySetInnerHTML={createMarkup(description)}
          />
          <hr />
        </Col>
        <Col span={24} md={16}>
          <Row gutter={[16, 16]}>{news?.value?.map(renderPost)}</Row>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Post);
