import {
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
import {
    EvilIcons,
    MaterialCommunityIcons,
    Ionicons,
    AntDesign,
} from '@expo/vector-icons'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { ImageBackground } from 'react-native'
import { url } from '../utils/constant'
import Conversation from '../components/Conversation'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'

const Message = ({ navigation, route }) => {
    const { accountId, setAccountId } = useContext(UserType)
    const [userId, setUserId] = useState({})
    const [conversations, setConversations] = useState([])
    useEffect(() => {
        const getUserIdByAccountId = async () => {
            const token = await AsyncStorage.getItem('AuthToken')
            const decodedToken = jwtDecode(token)
            setAccountId(decodedToken.accountId)
            axios
                .get(url + `/user/findUser?account_id=${accountId}`)
                .then((res) => {
                    setUserId(res.data._id)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        const getConversations = async (userId) => {
            axios
                .get(url + `/conversations/${userId}`)
                .then((res) => {
                    setConversations(res.data)
                })
                .catch((error) => {
                    console.log('error message', error)
                })
        }
        getUserIdByAccountId()
        getConversations(userId)
        const onFocused = navigation.addListener('focus', () => {
            getConversations(userId)
            getUserIdByAccountId()
        })
    }, [userId, navigation])

    useFonts({ Inter_600SemiBold })
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <LinearGradient
                    colors={['#474bff', '#478eff']}
                    useAngle={true}
                    angle={90}
                    style={styles.header}
                >
                    <TouchableOpacity style={styles.search}>
                        <EvilIcons
                            name="search"
                            style={styles.iconSearch}
                            size={30}
                            color="white"
                        />
                        <Text style={styles.txtSearch}>Tìm kiếm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <MaterialCommunityIcons
                            style={styles.iconQR}
                            name="qrcode-scan"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.btn,
                            {
                                marginRight: windowWidth * 0.02,
                            },
                        ]}
                        onPress={() => navigation.navigate('CreateGroup')}
                    >
                        <AntDesign
                            name="addusergroup"
                            size={25}
                            color="white"
                        />
                    </TouchableOpacity>
                </LinearGradient>
                <ScrollView style={styles.body}>
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
        height: windowHeight * 0.08,
        backgroundColor: '#1B96CB',
        flexDirection: 'row',
        alignItems: 'center',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconSearch: {
        marginLeft: windowWidth * 0.02,
    },
    btn: {
        padding: windowWidth * 0.01,
        marginRight: windowWidth * 0.01,
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
        height: windowHeight - windowHeight * 0.16,
    },
})
