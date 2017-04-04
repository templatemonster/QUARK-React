import React from 'react';

import Button from '../Button.jsx';

export default function B1L (props) {
  return (
    <Button
      widthType   = "full"
      heightType  = "large"
      roundedType = "bottom"
      bgType      = "1"
      {...props}
    >
      {props.children}
    </Button>
  );
}
