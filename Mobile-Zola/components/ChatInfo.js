import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'

const ChatInfo = ({ navigation, route }) => {
    const conversation = route.params.conversation
    console.log('conversation', conversation)
    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: conversation.avatar }}
                style={styles.avatar}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                    {conversation.conversationName}
                </Text>
                <TouchableOpacity style={styles.btn}>
                    <AntDesign name="edit" size={22} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ height: 10, backgroundColor: '#e0e0e0' }}></View>
            <TouchableOpacity style={styles.wrap}>
                <Feather
                    name="user-plus"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>Thêm thành viên</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ChatInfo

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
        marginVertical: windowHeight * 0.02,
    },
    btn: {
        paddingHorizontal: 10,
    },
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: windowHeight * 0.02,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    text: {
        fontSize: 17,
    },
    icon: {
        marginHorizontal: windowWidth * 0.05,
    },
})
