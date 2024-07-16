import React, { forwardRef } from "react";
import { Container, StyledFileInput } from "./index.style";
import { Label } from "../Input/index.style";

const File = forwardRef(({ name, onChange }, ref) => {
  return (
    <Container>
      <Label>Figura de herraje</Label>
      <StyledFileInput type="file" name={name} onChange={onChange} ref={ref}/>
    </Container>
  );
});

export default File;
