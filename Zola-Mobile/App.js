import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { primaryColor } from './components/Tab'
import Login from './screens/Login'
import Message from './screens/Message'

export default function App() {
    return (
        <Message/>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColor,
    },
})
