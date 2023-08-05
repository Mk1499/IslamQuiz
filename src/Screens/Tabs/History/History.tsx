import React from 'react';
import {connect} from 'react-redux';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar, TabBarProps} from 'react-native-tab-view';
import TakenQuizzes from './TakenQuizzes/TakenQuizzes';
import MyQuizzes from './MyQuizzes/MyQuizzes';
import I18n from '../../../translate';
import {useTheme} from '../../../Theme/ThemeProvider';
import makeStyle from './styles';

const renderScene = SceneMap({
  first: TakenQuizzes,
  second: MyQuizzes,
});

export const History = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(1);
  const routes = [
    {key: 'second', title: I18n.History.mine},
    {key: 'first', title: I18n.History.taken},
  ];
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={styles.content}
      renderTabBar={(prop: TabBarProps) => (
        <TabBar
          {...prop}
          style={styles.tabBarCont}
          labelStyle={styles.label}
          indicatorStyle={styles.indecator}
        />
      )}
    />
    // <TakenQuizzes />
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(History);
