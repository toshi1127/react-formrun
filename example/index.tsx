import React from "react";
import { useFormrun } from "../src";

type Props = {
  data?: [];
};

export const Example: React.FC<Props> = ({ data }) => {
  const { initFormrun, getFormrun } = useFormrun(
    { className: ".formrun-embed", type: "embed" },
    [data]
  );
  useFormrun({ className: ".formrun", type: "default" });

  initFormrun()
  const formrun = getFormrun()
  formrun?._formViews

  return (
    <div
      className="formrun-embed"
      data-formrun-form={`@hoge`}
      data-formrun-redirect="true"
    />
  );
};
