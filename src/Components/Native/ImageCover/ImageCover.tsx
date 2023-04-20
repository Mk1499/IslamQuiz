import React, {memo, useEffect, useState} from 'react';
import {Image} from 'react-native';

type MyProps = {
  uri: String;
  style: any;
};

function ImageCover({uri, style, children}: MyProps) {
  const [validURI, setvalidURI] = useState(false);
  useEffect(() => {
    fetch(uri).then(res => {
      // console.log('RES : ', res);
      if (res.status === 200) {
        setvalidURI(true);
      }
    });
  }, [uri]);
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

export default memo(ImageCover);
