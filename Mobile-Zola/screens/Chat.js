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
    ScrollView,
    Button,
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import {
    AntDesign,
    Entypo,
    MaterialIcons,
    Feather,
    MaterialCommunityIcons,
    FontAwesome,
    Ionicons,
} from '@expo/vector-icons'
import Tab from '../components/Tab'
import { url } from '../utils/constant'
import { format } from 'timeago.js'
import { io } from 'socket.io-client'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import LinearGradient from 'react-native-linear-gradient'
import ForwardMessage from '../components/ForwardMessage'
import { Video, ResizeMode, Audio } from 'expo-av'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'

const socketUrl = 'https://192.168.1.13:8800/'

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
    const [modalForward, setModalForward] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalAvatar, setModalAvatar] = useState('')
    const [modalTime, setModalTime] = useState('')
    const [messageId, setMessageId] = useState('')
    const [userId, setUserId] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('text')
    const [userConversation, setUserConversation] = useState([])
    const socket = useRef()
    const inputRef = useRef()
    const bodyRef = useRef()

    const [recording, setRecording] = useState()
    const [downloadProgress, setDownloadProgress] = useState(0)
    console.log(downloadProgress)

    const requestWritePermission = async () => {
        const { status } = await Permissions.askAsync(
            Permissions.WRITE_EXTERNAL_STORAGE,
        )
        if (status !== 'granted') {
            console.error('Quyền ghi file bị từ chối')
            return false
        }
        return true
    }

    const handleDownloadFile = async (url) => {
        try {
            if (requestWritePermission) {
                const localUri =
                    FileSystem.documentDirectory + url.split('/').pop()

                const downloadResumable = FileSystem.createDownloadResumable(
                    url,
                    localUri,
                    {},
                )
                const { uri } = await downloadResumable.downloadAsync()
                console.log('Finished downloading to ', uri)
            } else {
                console.error('Quyền ghi file bị từ chối')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pickDocument = async () => {
        try {
            console.log('Chọn tệp')
            const result = await DocumentPicker.getDocumentAsync()
            console.log('Tệp đã được chọn:', result)

            if (result) {
                // get file type
                const fileType = result.assets[0].name.split('.').pop()
                if (
                    fileType === 'jpg' ||
                    fileType === 'jpeg' ||
                    fileType === 'png'
                ) {
                    handleSendImageMessage(result.assets[0].uri)
                } else if (fileType === 'mp4') {
                    handleSendVideoMessage(result.assets[0].uri)
                } else {
                    handleSendDocumentMessage(
                        result.assets[0].uri,
                        result.assets[0].mimeType,
                        result.assets[0].name,
                    )
                }
            } else {
                console.log('Hủy chọn tệp')
            }
        } catch (error) {
            console.error('Lỗi chọn tệp:', error)
        }
    }

    async function startRecording() {
        try {
            const { status } = await Audio.requestPermissionsAsync()

            if (status !== 'granted') {
                console.error('Permission to access microphone was denied')
                return
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            })

            console.log('Starting recording..')
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY,
            )
            setRecording(recording)
            console.log('Recording started')
        } catch (err) {
            console.error('Failed to start recording', err)
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..')
        setRecording(undefined)
        await recording.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        })
        const uri = recording.getURI()
        console.log('Recording stopped and stored at', uri)
    }

    const handleSendImageMessage = async (imageMessage) => {
        const data = new FormData()
        data.append('file', {
            uri: imageMessage,
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
    }

    const handleSendDocumentMessage = async (uri, mimeType, name) => {
        const data = new FormData()
        data.append('file', {
            uri: uri,
            type: mimeType,
            name: name,
        })
        data.append('upload_preset', 'myzolaapp')
        data.append('cloud_name', 'dpj4kdkxj')

        fetch('https://api.cloudinary.com/v1_1/dpj4kdkxj/upload', {
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
                    contentType: 'file',
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
    }

    const handleSendVideoMessage = async (videoMessage) => {
        const data = new FormData()
        data.append('file', {
            uri: videoMessage,
            type: 'video/mp4',
            name: 'video.mp4',
        })
        data.append('upload_preset', 'myzolaapp')
        data.append('cloud_name', 'dpj4kdkxj')

        fetch('https://api.cloudinary.com/v1_1/dpj4kdkxj/video/upload', {
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
                    contentType: 'video',
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
    }

    const handleSendImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        })

        console.log(result.assets[0])

        if (!result.canceled) {
            //check file if it is image or video
            if (result.assets[0].type === 'image') {
                handleSendImageMessage(result.assets[0].uri)
            } else if (result.assets[0].type === 'video') {
                handleSendVideoMessage(result.assets[0].uri)
            }
        } else {
            console.log('canceled')
        }
    }

    useEffect(() => {
        socket.current = io(socketUrl)
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
    //alway scroll to last message
    useEffect(() => {
        setNumMessage(messages.length - 1)
    }, [messages])

    useEffect(() => {
        socket.current = io(socketUrl)
        socket.current.emit('setup', currentUserId)
        socket.current.on('connected', () => setSocketConnected(true))
        socket.current.on('typing', () => setIsTyping(true))
        socket.current.on('stop typing', () => setIsTyping(false))
        //socket.current.emit('new-user-add', currentUserId)
        // socket.current.on('get-users', (users) => {
        // setOnlineUsers(users)
        // })
    }, [currentUserId])

    const fetchMessages = async () => {
        try {
            const response = await fetch(url + `/messages/${conversation._id}`)
            const data = await response.json()
            // neu có id của người dùng trong deletedBy thì không hiển thị tin nhắn
            // const dataFilter = data.filter((message) => {
            // if (message.deletedBy.includes(currentUserId)) {
            // return false
            // }
            // return true
            // })
            setMessages(data.reverse())
            socket.current.emit('join chat', conversation._id)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (conversation !== null) {
            fetchMessages()
        }
    }, [conversation])
    //console.log(messages)
    const handleSend = async (e) => {
        // console.log(newMessage)
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
            socket.current.emit('new message', data)
            setMessages([data, ...messages])

            setNewMessage('')
        } catch (error) {
            console.log(error)
        }
        // send message to socket server
        // const receiverId = conversation.members.find(
        // (member) => member !== currentUserId,
        // )
        // setSendMessage({ ...message, receiverId })
    }

    //alway scroll to last message
    // useEffect(() => {
    // setNumMessage(messages.length - 1)
    // }, [messages])
    useEffect(() => {
        socket.current.on('message received', (message) => {
            // if (
            // message !== null &&
            // message.conversation_id === conversation._id
            // )
            // {
            setMessages([message, ...messages])
            //}
        })
    }, [messages])

    const handleReSend = async () => {
        // alert(
        // 'Thu hồi tin nhắn',
        // 'Bạn có chắc chắn muốn thu hồi tin nhắn này?',
        //[
        // {
        // text: 'Hủy',
        // onPress: () => setIsShowModalSend(false),
        // style: 'cancel',
        // },
        // {
        // text: 'Đồng ý',
        // onPress: async () => {
        //check time 24h
        // const dateNow = new Date().getDate()

        // if (dateNow - new Date(date).getDate() > 1) {
        // alert('Thông báo', 'Không thể thu hồi tin nhắn sau 24h')
        // setIsShowModalSend(false)
        // return
        // } else {
        try {
            const { data } = await axios.put(
                url + `/messages/recallMessage/${messageId}`,
            )
            fetchMessages()
            //setMessages([data, ...messages])
            setIsShowModalSend(false)
        } catch (error) {
            console.log(error)
        }
        //recall message to socket
        socket.current.emit('messageRecalled', messageId)

        // setSendMessage()
    }
    useEffect(() => {
        socket.current.on('messageRecalled', (messageId) => {
            // setMessages(messages.map(message =>
            // message._id === messageId ? { ...message, recalled: true } : message
            // ));
            setMessages(
                messages.map((message) => {
                    if (message._id === messageId) {
                        return { ...message, recalled: true }
                    }
                    return message
                }),
            )
        })
    }, [messages])

    const handleDelete = async () => {
        Alert.alert('Xóa tin nhắn', 'Bạn có chắc chắn muốn xóa tin nhắn này?', [
            {
                text: 'Hủy',
                onPress: () => setIsShowModalSend(false),
                style: 'cancel',
            },
            {
                text: 'Đồng ý',
                onPress: async () => {
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
                },
            },
        ])
    }

    const handleForwardMessage = (modalMessage) => {
        console.log('forward', modalMessage)
        setModalForward(true)
        setIsShowModalSend(false)
        setIsShowModalRecive(false)
        const getConversations = async (currentUserId) => {
            axios
                .get(url + `/conversations/${currentUserId}`)
                .then((res) => {
                    setUserConversation(res.data)
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log('error message', error)
                })
        }

        getConversations(currentUserId)
    }

    const ItemSend = ({ content, createdAt, messageId, recall, type }) => {
        const date = new Date(createdAt)
        const hours = date.getHours()
        let minutes = date.getMinutes()
        if (minutes < 10) {
            minutes = '0' + minutes
        }
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
                        ) : type === 'image' ? (
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
                        ) : type === 'video' ? (
                            <View>
                                <Video
                                    style={styles.video}
                                    source={{
                                        uri: content,
                                    }}
                                    resizeMode={ResizeMode.CONTAIN}
                                    isLooping
                                    useNativeControls
                                />
                                {/* <View style={styles.buttons}>
                                    <Button
                                        title={
                                            status.isPlaying ? 'Pause' : 'Play'
                                        }
                                        onPress={() =>
                                            status.isPlaying
                                                ? video.current.pauseAsync()
                                                : video.current.playAsync()
                                        }
                                    />
                                </View> */}
                            </View>
                        ) : type === 'file' ? (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleDownloadFile(content)
                                    }}
                                    style={{
                                        backgroundColor: '#fff',
                                        padding: 10,
                                        borderRadius: 10,
                                        marginVertical: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    {content.split('.').pop() === 'pdf' ? (
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                marginRight: 10,
                                            }}
                                            source={require('../image/pptx-file.png')}
                                        />
                                    ) : content.split('.').pop() === 'docx' ? (
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                marginRight: 10,
                                            }}
                                            source={require('../image/docx-file.png')}
                                        />
                                    ) : content.split('.').pop() === 'rar' ? (
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                marginRight: 10,
                                            }}
                                            source={require('../image/rar.png')}
                                        />
                                    ) : content.split('.').pop() === 'xlsx' ? (
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                marginRight: 10,
                                            }}
                                            source={require('../image/xlsx-file.png')}
                                        />
                                    ) : content.split('.').pop() === 'txt' ? (
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                marginRight: 10,
                                            }}
                                            source={require('../image/txt.png')}
                                        />
                                    ) : (
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                marginRight: 10,
                                            }}
                                            source={require('../image/file.png')}
                                        />
                                    )}
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            maxWidth: windowWidth * 0.5,
                                        }}
                                    >
                                        {content
                                            .split('/')
                                            .pop()
                                            .split('_')
                                            .slice(0, -1)
                                            .join('_') +
                                            '.' +
                                            content.split('.').pop()}
                                    </Text>
                                </TouchableOpacity>
                            </View>
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

    const ItemReceive = ({
        content,
        createdAt,
        messageId,
        recall,
        type,
        user_id,
        avatar,
        lastName,
    }) => {
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
                        {conversation.members.length === 2 ? null : (
                            <Text style={styles.senderName}>{lastName}</Text>
                        )}
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
                        ) : type === 'image' ? (
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
                    {recall ? null : (
                        <TouchableOpacity
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 5,
                            }}
                            onPress={() => {
                                setIsShowModalRecive(true)
                                setModalMessage(content)
                                setModalTime(`${hours}:${minutes}`)
                                setModalAvatar(userData?.avatar)
                                setMessageId(messageId)
                                setType(type)
                                setUserId(user_id)
                            }}
                        >
                            <MaterialCommunityIcons
                                name="dots-vertical"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    )}
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
                        paddingHorizontal: windowWidth * 0.03,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="left" size={26} color="white" />
                </TouchableOpacity>
                <TouchableOpacity ref={bodyRef} style={{ flex: 1 }}>
                    {conversation.members.length === 2 ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                style={styles.avatar}
                                source={{ uri: userData?.avatar }}
                            />
                            <Text style={styles.txtHeader}>
                                {userData?.userName}
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                style={styles.avatar}
                                source={{ uri: conversation.avatar }}
                            />
                            <Text style={styles.txtHeader}>
                                {conversation.conversationName}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: windowWidth * 0.01,
                    }}
                >
                    <Feather name="user-plus" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: windowWidth * 0.03,
                    }}
                    onPress={() =>
                        navigation.navigate('ChatInfo', {
                            conversation,
                        })
                    }
                >
                    <Feather name="list" size={26} color="white" />
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.body}>
                <FlatList
                    style={{
                        backgroundColor: '#e5e5e5',
                    }}
                    data={messages}
                    renderItem={({ item }) => {
                        if (
                            item.senderId?._id === currentUserId ||
                            item.senderId === currentUserId
                        ) {
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
                                    recall={item.recalled}
                                    type={item.contentType}
                                    user_id={item?.senderId?._id}
                                    avatar={item.senderId?.avatar}
                                    lastName={item.senderId?.lastName}
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
                <TouchableOpacity style={styles.iconBtn}>
                    <AntDesign name="smileo" size={24} color="black" />
                </TouchableOpacity>
                <TextInput
                    ref={inputRef}
                    style={{
                        flex: 1,
                        height: 45,
                        borderRadius: 10,
                        fontSize: 17,
                        paddingHorizontal: 10,
                    }}
                    value={newMessage}
                    onChangeText={(value) => setNewMessage(value)}
                    placeholder="Nhập tin nhắn..."
                />
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={recording ? stopRecording : startRecording}
                >
                    {recording ? (
                        <MaterialIcons
                            name="settings-voice"
                            size={24}
                            color="black"
                        />
                    ) : (
                        <MaterialIcons
                            name="keyboard-voice"
                            size={24}
                            color="black"
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn} onPress={pickDocument}>
                    <AntDesign name="paperclip" size={26} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={handleSendImage}
                >
                    <Ionicons name="image-outline" size={26} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn} onPress={handleSend}>
                    <FontAwesome name="send-o" size={24} color="black" />
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
                                            height: 200,
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
                            <TouchableOpacity
                                style={styles.modalBtn}
                                onPress={() =>
                                    handleForwardMessage(modalMessage)
                                }
                            >
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
                                            height: 200,
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
                            <TouchableOpacity
                                style={styles.modalBtn}
                                onPress={() =>
                                    navigation.navigate('Profile', { userId })
                                }
                            >
                                <FontAwesome
                                    name="user-circle-o"
                                    size={24}
                                    color="black"
                                />
                                <Text style={styles.modalText}>Thông tin</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalBtn}
                                onPress={() =>
                                    handleForwardMessage(modalMessage)
                                }
                            >
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalForward}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalForward(false)}
                    style={{
                        flex: 1,
                        backgroundColor: '#00000044',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#00000044',
                        }}
                    >
                        <View style={styles.forwardView}>
                            <TouchableOpacity
                                style={styles.modalBtnClose}
                                onPress={() => {
                                    setModalForward(false)
                                    fetchMessages()
                                }}
                            >
                                <AntDesign
                                    name="closecircleo"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <View
                                style={{
                                    marginTop: 30,
                                }}
                            >
                                <ScrollView>
                                    {userConversation.map((conversation) => {
                                        return (
                                            <ForwardMessage
                                                data={conversation}
                                                currentUserId={currentUserId}
                                                message={modalMessage}
                                                type={type}
                                            />
                                        )
                                    })}
                                </ScrollView>
                            </View>
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
        fontSize: 18,
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
        paddingHorizontal: windowWidth * 0.02,
        alignSelf: 'center',
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
        backgroundColor: '#fff', // light gray
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
        backgroundColor: '#C4E4FF', // Messenger blue
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
    iconBtn: {
        padding: windowWidth * 0.015,
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
        textAlign: 'center',
        height: 20,
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
        backgroundColor: '#fff', // light gray
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        maxWidth: '85%',
        alignSelf: 'flex-start',
    },

    forwardView: {
        backgroundColor: '#fff',
        width: windowWidth * 0.9,
        height: windowHeight * 0.8,
        alignSelf: 'center',
        marginTop: windowHeight * 0.1,
        borderRadius: 20,
        padding: 10,
        position: 'relative',
    },
    modalBtnClose: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    video: {
        width: windowWidth * 0.7,
        height: 'auto', // 100% 'auto
        minHeight: 200,
        alignSelf: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    senderName: {
        fontSize: 15,
        color: 'green',
    },
})
