import React from "react";

const Link = ({ url, target, title }) => (
  <a href={url} target={target} style={{ textDecoration: "none", color: "#FC6336" }}>
    {title}
  </a>
);

export default Link;
