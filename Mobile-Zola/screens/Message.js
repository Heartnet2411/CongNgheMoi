import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView,
} from 'react-native'
import React, { useContext } from 'react'
import { Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter'
import Tab from '../components/Tab'
import { EvilIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { ImageBackground } from 'react-native'
import Conversation from '../components/Conversation'

const Message = ({ navigation, route }) => {
    const listMess = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 2,
            name: 'Nguyễn Văn B',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 3,
            name: 'Nguyễn Văn C',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 4,
            name: 'Nguyễn Văn D',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 5,
            name: 'Nguyễn Văn E',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 6,
            name: 'Nguyễn Văn F',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 7,
            name: 'Nguyễn Văn G',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 8,
            name: 'Nguyễn Văn H',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 9,
            name: 'Nguyễn Văn I',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 10,
            name: 'Nguyễn Văn K',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 11,
            name: 'Nguyễn Văn L',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 12,
            name: 'Nguyễn Văn M',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 13,
            name: 'Nguyễn Văn N',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
    ]
    const { accountId, setAccountId } = useContext(UserType)
    const [userId, setUserId] = useState({})
    const [conversations, setConversations] = useState([])
    useEffect(() => {
        const getUserIdByAccountId = async () => {
            const token = await AsyncStorage.getItem('AuthToken')
            const decodedToken = jwtDecode(token)
            setAccountId(decodedToken.accountId)
            axios
                .get(
                    `http://localhost:3000/user/findUser?account_id=${accountId}`,
                )
                .then((res) => {
                    setUserId(res.data._id)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        const getConversations = async (userId) => {
            axios
                .get(`http://localhost:3000/conversations/${userId}`)
                .then((res) => {
                    setConversations(res.data)
                })
                .catch((error) => {
                    console.log('error message', error)
                })
        }
        getUserIdByAccountId()
        getConversations(userId)
    }, [userId])
    useFonts({ Inter_600SemiBold })
    return (
        <SafeAreaView>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.search}>
                        <EvilIcons
                            name="search"
                            style={styles.iconSearch}
                            size={30}
                            color="white"
                        />
                        <Text style={styles.txtSearch}>Tìm kiếm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons
                            style={styles.iconQR}
                            name="qrcode-scan"
                            size={25}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            name="add"
                            style={styles.iconAdd}
                            size={30}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.list}>
                        {conversations.map((conversation) => {
                            return (
                                <Conversation
                                    data={conversation}
                                    currentUserId={userId}
                                    key={conversation._id}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
                <Tab />
            </View>
        </SafeAreaView>
    )
}

export default Message

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    header: {
        height: 60,
        backgroundColor: '#1B96CB',
        flexDirection: 'row',
        alignItems: 'center',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 280,
    },
    iconSearch: {
        marginLeft: 10,
    },
    txtSearch: {
        marginLeft: 15,
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
    },
    iconQR: {
        width: 28,
        height: 28,
        marginLeft: 10,
    },
    iconAdd: {
        width: 35,
        height: 35,
        marginLeft: 15,
    },
    list: {
        height: Math.round(windowHeight) - 60,
    },
})
