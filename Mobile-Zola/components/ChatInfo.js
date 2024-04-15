import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Modal,
} from 'react-native'
import React from 'react'
import {
    AntDesign,
    Feather,
    MaterialCommunityIcons,
    Entypo,
    MaterialIcons,
    Ionicons,
} from '@expo/vector-icons'

const ChatInfo = ({ navigation, route }) => {
    const conversation = route.params.conversation
    const currentUserId = route.params.currentUserId
    console.log('conversation', conversation)
    console.log('currentUserId', currentUserId)

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
                    alignItems: 'center',
                    paddingBottom: 10,
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                >
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
                    size={22}
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>Thêm thành viên</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.wrap}
                onPress={() =>
                    navigation.navigate('MembersList', { conversation })
                }
            >
                <MaterialCommunityIcons
                    name="account-group-outline"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>
                    Thành viên nhóm ({conversation.members.length})
                </Text>
                <Entypo
                    name="chevron-right"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrap}>
                <AntDesign
                    name="edit"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>Chỉnh sửa tên nhóm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrap}>
                <Ionicons
                    name="camera-reverse-sharp"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>Đổi ảnh nhóm</Text>
            </TouchableOpacity>
            {currentUserId === conversation.groupLeader ||
            conversation.deputyLeader.contains(currentUserId) ? (
                <TouchableOpacity style={styles.wrap}>
                    <MaterialCommunityIcons
                        name="account-key-outline"
                        size={24}
                        color="black"
                        style={styles.icon}
                    />
                    <Text style={styles.text}>Chuyển quyền trưởng nhóm</Text>
                </TouchableOpacity>
            ) : null}
            {currentUserId === conversation.groupLeader ? (
                <TouchableOpacity style={styles.wrap}>
                    <MaterialIcons
                        name="group-off"
                        size={24}
                        color="red"
                        style={styles.icon}
                    />
                    <Text style={styles.textForce}>Giải tán nhóm</Text>
                </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={styles.wrap}>
                <Feather
                    name="log-out"
                    size={24}
                    color="red"
                    style={styles.icon}
                />
                <Text style={styles.textForce}>Rời nhóm</Text>
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
        flex: 1,
    },
    textForce: {
        fontSize: 17,
        color: 'red',
        flex: 1,
    },
    icon: {
        marginHorizontal: windowWidth * 0.05,
    },
})
