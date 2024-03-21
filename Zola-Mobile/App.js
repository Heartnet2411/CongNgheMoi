import { StyleSheet, Text, View } from 'react-native'
import Login from './screens/Login'
import Message from './screens/Message'
import Personal from './screens/Personal'
import Tab from './components/Tab'
import EditInfo from './components/EditInfo'
import EditPassword from './components/EditPassword'
import Register from './screens/Register'
import ConfirmCode from './components/ConfirmCode'
import PhoneInput from './components/PhoneInput'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export default function App() {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Message"
                    component={Message}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Personal"
                    component={Personal}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Tab"
                    component={Tab}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditInfo"
                    component={EditInfo}
                    options={{ title: 'Thay đổi thông tin tài khoản' }}
                />
                <Stack.Screen
                    name="EditPassword"
                    component={EditPassword}
                    options={{ title: 'Thay đổi mật khẩu' }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ConfirmCode"
                    component={ConfirmCode}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PhoneInput"
                    component={PhoneInput}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
