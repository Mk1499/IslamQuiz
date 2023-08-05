import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import UpdateApp from '../Screens/Shared/UpdateApp/UpdateApp';
import {connect} from 'react-redux';
import config from '../Config/config';

function ForceUpdate({children, fireConfig}) {
  // console.log('fire config in force update : ', fireConfig);
  if (config.buildNumber < parseInt(fireConfig.activeBuildNumber, 10)) {
    SplashScreen.hide();
    return <UpdateApp />;
  } else {
    return children;
  }
}

const mapStateToProps = (state: any) => ({
  fireConfig: state.fireConfig,
});

export default connect(mapStateToProps, {})(ForceUpdate);
