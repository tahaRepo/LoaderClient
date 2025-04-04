import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BOTTOM_APPBAR_HEIGHT = hp('5%');

const BottomBar = ({content}) => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: theme.colors.pinky,
        },
        {
            justifyContent: 'center',
        }
      ]}
      safeAreaInsets={{ bottom }}
      
    >
      <Appbar.Action icon="copyright" disabled={true} />
      <Text
        style={{
            fontWeight: 'bold'
        }}
      >{content}</Text>
     
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  
});

export default BottomBar;