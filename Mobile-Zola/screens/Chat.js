import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import {
    AntDesign,
    Entypo,
    MaterialIcons,
    Feather,
    MaterialCommunityIcons,
} from '@expo/vector-icons'
import Tab from '../components/Tab'
import { url } from '../utils/constant'
import { format } from 'timeago.js'
import { io } from 'socket.io-client'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import LinearGradient from 'react-native-linear-gradient'

const Chat = ({ navigation, route }) => {
    const userData = route.params.userData
    const conversation = route.params.conversation
    const currentUserId = route.params.currentUserId
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [numMessage, setNumMessage] = useState(0)
    //const [receiveMessage,setReceiveMessage]=useState(null)
    const [isShowModalSend, setIsShowModalSend] = useState(false)
    const [isShowModalRecive, setIsShowModalRecive] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalAvatar, setModalAvatar] = useState('')
    const [modalTime, setModalTime] = useState('')
    const [messageId, setMessageId] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('text')
    const socket = useRef()

    const handleSendImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            const data = new FormData()
            data.append('file', {
                uri: result.assets[0].uri,
                type: 'image/jpeg' || 'image/png' || 'image/jpg',
                name: 'image.jpg',
            })
            data.append('upload_preset', 'myzolaapp')
            data.append('cloud_name', 'dpj4kdkxj')

            fetch('https://api.cloudinary.com/v1_1/dpj4kdkxj/image/upload', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    console.log('Success:', data)
                    const message = {
                        senderId: currentUserId,
                        content: data.url,
                        conversation_id: conversation._id,
                        contentType: 'image',
                    }
                    //send message to database
                    axios
                        .post(url + `/messages/`, message)
                        .then(({ data }) => {
                            setMessages([data, ...messages])
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
                .finally(() => {})
        } else {
            console.log('canceled')
        }
    }

    useEffect(() => {
        socket.current = io(`http://192.168.1.6:8800`)
        socket.current.emit('new-user-add', currentUserId)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
        })
    }, [currentUserId])
    //sending message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])
    //receive  new messages from socket server
    useEffect(() => {
        socket.current.on('receive-message', (message) => {
            //console.log("received",message)
            if (
                message !== null &&
                message.conversation_id === conversation._id
            ) {
                setMessages([...messages, message])
            }
        })
    }, [messages])

    const fetchMessages = async () => {
        try {
            const response = await fetch(url + `/messages/${conversation._id}`)
            const data = await response.json()
            // neu có id của người dùng trong deletedBy thì không hiển thị tin nhắn
            const dataFilter = data.filter((message) => {
                if (message.deletedBy.includes(currentUserId)) {
                    return false
                }
                return true
            })
            setMessages(dataFilter.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (conversation !== null) {
            fetchMessages()
        }
    }, [conversation])

    const handleSend = async (e) => {
        if (newMessage === '') {
            return
        } else {
            console.log(newMessage)
            e.preventDefault()
            const message = {
                senderId: currentUserId,
                content: newMessage,
                conversation_id: conversation._id,
                contentType: 'text',
            }
            //send message to database
            try {
                const { data } = await axios.post(url + `/messages/`, message)
                setMessages([data, ...messages])
                setNewMessage('')
            } catch (error) {
                console.log(error)
            }
            //send message to socket server
            const receiverId = conversation.members.find(
                (member) => member !== currentUserId,
            )
            setSendMessage({ ...message, receiverId: receiverId })
        }
    }

    //alway scroll to last message
    useEffect(() => {
        setNumMessage(messages.length - 1)
    }, [messages])

    const handleReSend = async () => {
        //check time 24h
        const dateNow = new Date().getDate()

        if (dateNow - new Date(date).getDate() > 1) {
            Alert.alert('Thông báo', 'Không thể thu hồi tin nhắn sau 24h')
            setIsShowModalSend(false)
            return
        } else {
            try {
                const { data } = await axios.put(
                    url + `/messages/recallMessage/${messageId}`,
                )
                fetchMessages()
                setIsShowModalSend(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleDelete = async () => {
        try {
            axios
                .put(url + `/messages/deleteMessage`, {
                    message_id: messageId,
                    user_id: currentUserId,
                })
                .finally(() => {
                    fetchMessages()
                })
            setIsShowModalSend(false)
            setIsShowModalRecive(false)
        } catch (error) {
            setIsShowModalSend(false)
            setIsShowModalRecive(false)
            console.log(error)
        }
    }

    const ItemSend = ({ content, createdAt, messageId, recall, type }) => {
        const date = new Date(createdAt)
        const hours = date.getHours()
        let minutes = date.getMinutes()
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        console.log(type)
        return (
            <View style={styles.RightMsg}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                    }}
                >
                    {!recall ? (
                        <TouchableOpacity
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 5,
                            }}
                            onPress={() => {
                                setIsShowModalSend(true)
                                setModalMessage(content)
                                setModalTime(`${hours}:${minutes}`)
                                setMessageId(messageId)
                                setDate(createdAt)
                                setType(type)
                            }}
                        >
                            <MaterialCommunityIcons
                                name="dots-vertical"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    ) : null}
                    <View style={styles.messageSend}>
                        {recall ? (
                            <Text
                                style={{
                                    fontSize: 17,
                                    color: '#8F9BB3',
                                    fontStyle: 'italic',
                                }}
                            >
                                Tin nhắn đã được thu hồi
                            </Text>
                        ) : type === 'text' ? (
                            <Text
                                style={{
                                    fontSize: 17,
                                }}
                            >
                                {content}
                            </Text>
                        ) : type === 'text' ? (
                            <Image
                                source={{ uri: content }}
                                style={{
                                    width: windowWidth * 0.7,

                                    height: 'auto', // 100% 'auto
                                    minHeight: 200,
                                    objectFit: 'contain',
                                    alignSelf: 'center',
                                }}
                            />
                        ) : null}
                        <Text
                            style={{
                                fontSize: 15,
                                color: '#737373',
                            }}
                        >
                            {hours}:{minutes}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    const ItemReceive = ({ content, createdAt, messageId, type }) => {
        const date = new Date(createdAt)
        const hours = date.getHours()
        let minutes = date.getMinutes()
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        return (
            <View style={styles.LeftMsg}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                    }}
                >
                    <TouchableOpacity>
                        <Image
                            style={styles.avatar}
                            source={{ uri: userData?.avatar }}
                        />
                    </TouchableOpacity>
                    <View style={styles.messageReceive}>
                        <Text
                            style={{
                                fontSize: 17,
                            }}
                        >
                            {content}
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                color: '#737373',
                            }}
                        >
                            {hours}:{minutes}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                        onPress={() => {
                            setIsShowModalRecive(true)
                            setModalMessage(content)
                            setModalTime(`${hours}:${minutes}`)
                            setModalAvatar(userData?.avatar)
                            setMessageId(messageId)
                            setType(type)
                        }}
                    >
                        <MaterialCommunityIcons
                            name="dots-vertical"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#474bff', '#478eff']}
                useAngle={true}
                angle={90}
                style={styles.header}
            >
                <TouchableOpacity
                    style={{
                        paddingHorizontal: windowWidth * 0.02,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="left" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>{userData?.userName}</Text>
            </LinearGradient>
            <View style={styles.body}>
                <FlatList
                    style={{
                        backgroundColor: '#d4d4d4',
                    }}
                    data={messages}
                    renderItem={({ item }) => {
                        if (item.senderId === currentUserId) {
                            return (
                                <ItemSend
                                    content={item.content}
                                    createdAt={item.createdAt}
                                    messageId={item._id}
                                    recall={item.recalled}
                                    type={item.contentType}
                                />
                            )
                        } else {
                            return (
                                <ItemReceive
                                    content={item.content}
                                    createdAt={item.createdAt}
                                    messageId={item._id}
                                    type={item.contentType}
                                />
                            )
                        }
                    }}
                    keyExtractor={(item) => item._id}
                    inverted
                    scrollEnabled={true}
                ></FlatList>
            </View>
            <View style={styles.chat}>
                <TextInput
                    style={{
                        width: windowWidth - 150,
                        height: 45,
                        borderRadius: 10,
                        marginLeft: 10,
                        borderColor: 'gray',
                        borderWidth: 1,
                    }}
                    value={newMessage}
                    onChangeText={(value) => setNewMessage(value)}
                />
                <TouchableOpacity style={styles.iconattach}>
                    <MaterialIcons name="attachment" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSendImage}>
                    <Feather name="image" size={27} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconSend} onPress={handleSend}>
                    <MaterialIcons name="send" size={30} color="black" />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isShowModalSend}
            >
                <TouchableWithoutFeedback
                    onPress={() => setIsShowModalSend(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#00000044',
                        }}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                bottom: windowHeight * 0.22,
                                right: windowWidth * 0.05,
                                width: windowWidth * 0.9,
                            }}
                        >
                            <View style={styles.modalMessageSend}>
                                {type === 'text' ? (
                                    <Text
                                        style={{
                                            fontSize: 17,
                                        }}
                                    >
                                        {modalMessage}
                                    </Text>
                                ) : (
                                    <Image
                                        source={{ uri: modalMessage }}
                                        style={{
                                            width: windowWidth * 0.7,

                                            height: 'auto',
                                            minHeight: 200,
                                            objectFit: 'contain',
                                            alignSelf: 'center',
                                        }}
                                    />
                                )}
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: '#737373',
                                    }}
                                >
                                    {modalTime}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.modalWrap}>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Feather name="send" size={24} color="black" />
                                <Text style={styles.modalText}>
                                    Chuyển tiếp
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalBtn}
                                onPress={handleReSend}
                            >
                                <MaterialCommunityIcons
                                    name="message-off-outline"
                                    size={24}
                                    color="black"
                                />
                                <Text style={styles.modalText}>Thu hồi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalBtn}
                                onPress={handleDelete}
                            >
                                <AntDesign
                                    name="delete"
                                    size={24}
                                    color="black"
                                />
                                <Text style={styles.modalText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isShowModalRecive}
            >
                <TouchableWithoutFeedback
                    onPress={() => setIsShowModalRecive(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#00000044',
                        }}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                bottom: windowHeight * 0.22,
                                right: windowWidth * 0.05,
                                width: windowWidth * 0.9,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity>
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: modalAvatar }}
                                />
                            </TouchableOpacity>
                            <View style={styles.modalMessageRevice}>
                                {type === 'text' ? (
                                    <Text
                                        style={{
                                            fontSize: 17,
                                        }}
                                    >
                                        {modalMessage}
                                    </Text>
                                ) : (
                                    <Image
                                        source={{ uri: modalMessage }}
                                        style={{
                                            width: windowWidth * 0.7,

                                            height: 'auto',
                                            minHeight: 200,
                                            objectFit: 'contain',
                                            alignSelf: 'center',
                                        }}
                                    />
                                )}
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: '#737373',
                                    }}
                                >
                                    {modalTime}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.modalWrap}>
                            <TouchableOpacity style={styles.modalBtn}>
                                <Feather name="send" size={24} color="black" />
                                <Text style={styles.modalText}>
                                    Chuyển tiếp
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalBtn}
                                onPress={handleDelete}
                            >
                                <AntDesign
                                    name="delete"
                                    size={24}
                                    color="black"
                                />
                                <Text style={styles.modalText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    )
}

export default Chat
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    header: {
        height: windowHeight * 0.08,
        width: windowWidth,
        backgroundColor: '#1B96CB',
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtHeader: {
        color: '#fff',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 20,
    },
    iconCloud: {
        marginLeft: 20,
    },
    body: {
        width: windowWidth,
        height: windowHeight - windowHeight * 0.15,
        backgroundColor: '#fff',
    },
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: windowHeight * 0.07,
        position: 'absolute',
        bottom: 0,
        width: windowWidth,
    },
    avatar: {
        width: windowWidth * 0.1,
        height: windowWidth * 0.1,
        borderRadius: windowWidth * 0.05,
        marginHorizontal: 10,
    },
    iconemj: {
        marginLeft: 10,
    },
    input: {
        width: windowWidth - 150,
        height: 45,
        borderRadius: 10,
        marginLeft: 10,
    },
    LeftMsg: {
        alignItems: 'flex-start',
        width: windowWidth,
    },
    messageReceive: {
        backgroundColor: '#e5e5ea', // light gray
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        maxWidth: '75%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    RightMsg: {
        alignItems: 'flex-end',
        width: windowWidth,
    },
    messageSend: {
        backgroundColor: '#98E4FF', // Messenger blue
        color: 'white',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        maxWidth: '75%',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconattach: {
        marginLeft: 0,
    },
    iconSend: {
        marginLeft: 10,
    },

    modalWrap: {
        backgroundColor: '#fff',
        padding: 10,
        width: windowWidth * 0.9,
        height: windowHeight * 0.15,
        flexDirection: 'row',
        marginTop: windowHeight * 0.8,
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    modalBtn: {
        padding: 10,
        alignItems: 'center',
        width: windowWidth * 0.3,
    },
    modalText: {
        fontSize: 15,
    },
    modalMessageSend: {
        backgroundColor: '#98E4FF', // Messenger blue
        color: 'white',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        maxWidth: '85%',
        alignSelf: 'flex-end',
    },

    modalMessageRevice: {
        backgroundColor: '#e5e5ea', // light gray
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        maxWidth: '85%',
        alignSelf: 'flex-start',
    },
})
