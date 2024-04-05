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
    const [userData, setUserData] = useState(null)
    const navigation = useNavigation()
    const route = useRoute()

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        const getUserData = async () => {
            axios.get(`${url}/user/findUserByUserId/${userId}`).then((res) => {
                setUserData(res.data)
            })
        }
        getUserData()
    }, [data, currentUserId])
    console.log(userData)
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
                        width: 250,
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
                    <Text
                        style={{
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 14,
                            color: '#8F9BB3',
                        }}
                    ></Text>
                </View>
                <Text
                    style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 14,
                        color: '#8F9BB3',
                    }}
                ></Text>
            </View>
        </TouchableOpacity>
    )
}

export default Conversation

const styles = StyleSheet.create({})
