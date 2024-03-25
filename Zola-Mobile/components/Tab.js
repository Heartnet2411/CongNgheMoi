import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function Tab({}) {
    const navigation = useNavigation()
    return (
        <View style={styles.tab}>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Message')}
            >
                <AntDesign name="message1" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Contact')}
            >
                <AntDesign name="contacts" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Cloud')}
            >
                <AntDesign name="cloudo" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Personal')}
            >
                <AntDesign name="user" size={30} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    tab: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        position: 'absolute',
        bottom: 0,
        marginHorizontal: 0,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
})
