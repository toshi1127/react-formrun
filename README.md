# react-slim-use-form
Easy to use formrun with React Hooks.

## How to install
`npm install react-formrun` or `yarn add react-formrun`

## How to use

```typescript
import React from "react";
import { useFormrun } from "react-formrun";

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
```
