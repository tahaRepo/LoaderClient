import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);