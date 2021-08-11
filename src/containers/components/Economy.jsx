import React, { memo } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import { createMarkup } from "../../utils";

const Economy = ({ values }) => {
  const history = useHistory();

  const renderImg = (image, description) => (
    <img src={image.url} width="100%" alt={description} />
  );

  const renderDescription = (description) => (
    <p dangerouslySetInnerHTML={createMarkup(description)}></p>
  );

  const renderTitle = (title) => (
    <strong dangerouslySetInnerHTML={createMarkup(title)}></strong>
  );

  const openPost = (id) => {
    history.push(`/economy/${id}`);
  };

  const renderPost = (post, idx) => {
    const { id, title, description, image } = post;
    return (
      <Col span={24} md={12} key={`post_${idx}`}>
        <article onClick={() => openPost(id)}>
          <p>{renderTitle(title)}</p>
          {image?.url
            ? renderImg(image, description)
            : renderDescription(description)}
        </article>
      </Col>
    );
  };

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
};

Economy.defaultProps = {
  values: [],
};

Economy.propTypes = {
  values: PropTypes.array.isRequired,
};

export default memo(Economy);
