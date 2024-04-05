import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Keyboard,
    TextInput,
    TouchableOpacity,
    Touchable,
    Image,
    ScrollView,
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { AntDesign, Entypo, MaterialIcons, Feather } from '@expo/vector-icons'
import Tab from '../components/Tab'
import { url } from '../utils/constant'
import InputEmoji from 'react-input-emoji'
import { format } from 'timeago.js'
import { io } from 'socket.io-client'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'

const Chat = ({ navigation, route }) => {
    const userData = route.params.userData
    const conversation = route.params.conversation
    const currentUserId = route.params.currentUserId
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    //const [receiveMessage,setReceiveMessage]=useState(null)
    const socket = useRef()
    const scroll = useRef()

    useEffect(() => {
        socket.current = io(`http://192.168.1.128:8800`)
        socket.current.emit('new-user-add', currentUserId)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
            console.log('online users', users)
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
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(
                    url + `/messages/${conversation._id}`,
                )
                const data = await response.json()
                setMessages(data)
            } catch (error) {
                console.log(error)
            }
        }
        if (conversation !== null) {
            fetchMessages()
        }
    }, [conversation])
    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }
    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUserId,
            content: newMessage,
            conversation_id: conversation._id,
        }
        //send message to database
        try {
            const { data } = await axios.post(url + `/messages/`, message)
            setMessages([...messages, data])
            setNewMessage('')
        } catch (error) {
            console.log(error)
        }
        //send message to socket server
        const receiverId = conversation.members.find(
            (member) => member !== currentUserId,
        )
        setSendMessage({ ...message, receiverId })
    }
    //alway scroll to last message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>{userData?.userName}</Text>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    {messages.map((message) => {
                        if (message.senderId === userData._id)
                            // check xem người gửi có phải của người dùng hiện tại không
                            return (
                                <View key={message._id} ref={scroll}>
                                    {/* <TouchableOpacity> */}
                                    {/* <Image style={styles.avatar} source={{uri: userData?.avatar}}/> */}
                                    {/* </TouchableOpacity> */}
                                    <View style={styles.LeftMsg}>
                                        <Text>{message.content}</Text>
                                        <Text>{format(message.createdAt)}</Text>
                                    </View>
                                </View>
                            )
                        else
                            return (
                                <View key={message._id} ref={scroll}>
                                    <View style={styles.RightMsg}>
                                        <Text>{message.content}</Text>
                                        <Text>{format(message.createdAt)}</Text>
                                    </View>
                                </View>
                            )
                    })}
                </ScrollView>
            </View>
            <View style={styles.chat}>
                <InputEmoji
                    value={newMessage}
                    onChange={handleChange}
                ></InputEmoji>
                <TouchableOpacity style={styles.iconattach}>
                    <MaterialIcons name="attachment" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="image" size={27} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconSend} onPress={handleSend}>
                    <MaterialIcons name="send" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Chat
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 60,
        width: windowWidth,
        backgroundColor: '#1B96CB',
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtHeader: {
        color: '#fff',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10,
    },
    iconCloud: {
        marginLeft: 20,
    },
    body: {
        width: windowWidth,
        height: 560,
        backgroundColor: '#fff',
    },
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
        maxWidth: '80%',
        alignSelf: 'flex-start',
        backgroundColor: '#e5e5ea', // light gray
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 50,
    },
    RightMsg: {
        maxWidth: '80%',
        alignSelf: 'flex-end',
        backgroundColor: '#0084ff', // Messenger blue
        color: 'white',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 10,
    },
    iconattach: {
        marginLeft: 0,
    },
    iconSend: {
        marginLeft: 10,
    },
})
