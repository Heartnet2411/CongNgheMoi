import {
    StyleSheet,
    Text,
    Touchable,
    View,
    TouchableOpacity,
    Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../utils/constant'
import { useNavigation, useRoute } from '@react-navigation/native'

const Conversation = ({ data, currentUserId }) => {
    console.log(data)
    const [userData, setUserData] = useState(null)
    const navigation = useNavigation()
    const [newestMessage, setNewestMessage] = useState('')
    const [newestMessageTime, setNewestMessageTime] = useState('')
    const route = useRoute()
    console.log(newestMessage)

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        const getUserData = async () => {
            axios.get(`${url}/user/findUserByUserId/${userId}`).then((res) => {
                setUserData(res.data)
            })
        }
        //get newest message
        const getNewestMessage = async () => {
            axios
                .post(`${url}/messages/findNewestMessage/${data._id}`, {
                    userId: currentUserId,
                })
                .then((res) => {
                    setNewestMessage(res.data)
                    setNewestMessageTime(
                        new Date(res.data.createdAt).getHours() +
                            ':' +
                            new Date(res.data.createdAt).getMinutes(),
                    )
                })
                .catch((error) => {
                    console.log('error message', error)
                })
        }
        getNewestMessage()
        getUserData()
    }, [data, currentUserId])
    // console.log(userData)

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('Chat', {
                    userData: userData,
                    currentUserId: currentUserId,
                    conversation: data,
                })
            }
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 10,
                }}
            >
                <Image
                    source={{ uri: userData?.avatar }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                    }}
                />
                <View
                    style={{
                        marginLeft: 10,
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 18,
                        }}
                    >
                        {userData?.userName}
                    </Text>
                    {newestMessage.recalled === true ? (
                        <Text
                            style={{
                                fontFamily: 'Inter_600SemiBold',
                                fontSize: 14,
                                color: '#8F9BB3',
                                fontStyle: 'italic',
                            }}
                        >
                            Tin nhắn đã được thu hồi
                        </Text>
                    ) : newestMessage.contentType === 'text' ? (
                        <Text
                            style={{
                                fontFamily: 'Inter_600SemiBold',
                                fontSize: 14,
                                color: '#8F9BB3',
                            }}
                        >
                            {newestMessage?.content}
                        </Text>
                    ) : newestMessage.contentType === 'image' ? (
                        <Text
                            style={{
                                fontFamily: 'Inter_600SemiBold',
                                fontSize: 14,
                                color: '#8F9BB3',
                            }}
                        >
                            [Hình ảnh]
                        </Text>
                    ) : null}
                </View>
                <Text
                    style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 14,
                        color: '#8F9BB3',
                    }}
                >
                    {newestMessageTime}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Conversation

const styles = StyleSheet.create({})
