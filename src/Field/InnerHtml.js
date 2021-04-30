import React from "react";

const InnerHtml = ({ config, formik, value, error }) => {
  const {
    name,
    as: Component = "div",
    htmlClass,
    defaultValue = "",
    ...attributes
  } = config;

  return (
    <Component className={htmlClass} {...attributes}>
      <div dangerouslySetInnerHTML={{ __html: value || defaultValue }}></div>
    </Component>
  );
};

export default React.memo(InnerHtml);
