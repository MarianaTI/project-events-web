import React, { forwardRef } from "react";
import { Container, StyledFileInput } from "./index.style";
import { Label } from "../Input/index.style";

const File = forwardRef(({ name, onChange, fileName }, ref) => {
  return (
    <Container>
      <Label>Figura de herraje</Label>
      <StyledFileInput type="file" name={name} onChange={onChange} ref={ref}/>
      {/* {fileName ? fileName : "Ningún archivo seleccionado"} */}
    </Container>
  );
});

export default File;
