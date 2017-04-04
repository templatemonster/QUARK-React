import React from 'react';

import Button from '../Button.jsx';

export default function B3K (props) {
  return (
    <Button
      widthType   = "full"
      heightType  = "large"
      roundedType = "bottom"
      bgType      = "3"
      {...props}
    >
      {props.children}
    </Button>
  );
}
