import React from "react";
import copyIcon from "../../images/copy.svg";
import shareIcon from "../../images/share.svg";

const navigatorHasShare = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const URL = "http://localhost:3001";

function Action({ post, subject }) {
  const { id, title } = post;

  const shareInfo = () => {
    navigator.share({
      title: `rbeNews - ${subject}`,
      text: title,
      url: URL,
    });
  };

  const copyInfo = () => {
    navigator.clipboard.writeText(
      `${title} - *Learn more about in ${URL}/${subject}/${id}`
    );
  };

  const renderAction = () => {
    const action = navigatorHasShare ? shareInfo : copyInfo;

    const icon = navigatorHasShare ? shareIcon : copyIcon;

    return (
      <img alt="icon" src={icon} className="share-icon" onClick={action} />
    );
  };
  return <div className="share">{renderAction()}</div>;
}

export default Action;
