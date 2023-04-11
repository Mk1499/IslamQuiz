import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {setFireData} from '../Redux/Actions/fireConfig.action';
import remoteConfig from '@react-native-firebase/remote-config';

type MyProps = {
  setFireData: Function;
};

function FireConfig(props: MyProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFireConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setFireConfig() {
    remoteConfig()
      //   .setDefaults({})
      .setConfigSettings({
        minimumFetchIntervalMillis: 6,
      })
      .then(() => {
        remoteConfig().fetchAndActivate();
      })
      .then(() => {
        const values = remoteConfig().getAll();
        let configObj = {};
        if (values) {
          Object.keys(values).map(key => {
            configObj[key] = values[key]?._value;
          });
        }
        console.log('D : ', configObj);
        props.setFireData(configObj);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return null;
  } else {
    return props.children;
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {setFireData})(FireConfig);
