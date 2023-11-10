import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={476}
    viewBox="0 0 280 476"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="pizza-block"
  >
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="30" />
    <rect x="0" y="312" rx="10" ry="10" width="280" height="92" />
    <rect x="135" y="424" rx="25" ry="25" width="143" height="46" />
    <rect x="0" y="440" rx="10" ry="10" width="80" height="27" />
  </ContentLoader>
);

export default MyLoader;
