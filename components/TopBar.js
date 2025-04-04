import * as React from 'react';
import { Appbar,Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const TopBar = ({title, leftSide=false, rightSide=false, leftChild, rightChild}) => {
    const theme = useTheme();
  
    return (
        <Appbar.Header
            mode='small'
            style={{
                backgroundColor: theme.colors.pinky,
            }}
        >
            {(leftSide) ? leftChild : null}
            <Appbar.Content 
                style={{
                    alignItems:'center'
                }}
               title={
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            textTransform: 'uppercase',
                            
                        }}
                    >{title}</Text>
                }
            />
            {(rightSide) ? rightChild : null}
        </Appbar.Header>
    )
}

export default TopBar;