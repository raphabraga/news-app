import React, { memo, useEffect, useState } from "react";
import { Row, Col } from "antd";
import api from "../api";
import Economy from "./components/Economy";
import Technology from "./components/Technology";
import World from "./components/World";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleNews = (articles) => {
    setLoading(false);
    setNews({
      world: articles[0]?.value.value,
      technology: articles[1]?.value.value,
      economy: articles[2]?.value.value,
    });
  };

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      api.getNews("world"),
      api.getNews("technology"),
      api.getNews("economy"),
    ]).then(handleNews);
  }, []);

  return loading ? (
    <h2>Page loading</h2>
  ) : (
    <div>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <h2>World</h2>
          <World values={news?.world} />
        </Col>
      </Row>
      <hr />
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <h2>Economy</h2>
          <Economy values={news?.economy} />
        </Col>
      </Row>
      <hr />
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <h2>Technology</h2>
          <Technology values={news?.technology} />
        </Col>
      </Row>
    </div>
  );
}

export default memo(Home);
