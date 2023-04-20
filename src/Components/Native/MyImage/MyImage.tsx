import React, {memo, useEffect, useState} from 'react';
import {Image} from 'react-native';

type MyProps = {
  uri: String;
  style: any;
  isStatic: Boolean;
};

function MyImage({uri, style, children, isStatic}: MyProps) {
  const [validURI, setvalidURI] = useState(false);
  useEffect(() => {
    if (!isStatic) {
      fetch(uri).then(res => {
        if (res.status === 200) {
          setvalidURI(true);
        }
      });
    } else {
      setvalidURI(true);
    }
  }, [uri, isStatic]);
  return (
    <Image
      source={
        validURI
          ? {uri}
          : require('../../../../assets/images/placeholders/catCover.png')
      }
      style={style}>
      {children}
    </Image>
  );
}
export default memo(MyImage);
