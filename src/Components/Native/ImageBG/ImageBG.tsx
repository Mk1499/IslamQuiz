import React, {useEffect, useState} from 'react';
import {ImageBackground} from 'react-native';

type MyProps = {
  uri: String;
  style: any;
};

export default function ImageBG({uri, style, children}: MyProps) {
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
    <ImageBackground
      source={
        validURI
          ? {uri}
          : require('../../../../assets/images/placeholders/catCover.png')
      }
      style={style}>
      {children}
    </ImageBackground>
  );
}
