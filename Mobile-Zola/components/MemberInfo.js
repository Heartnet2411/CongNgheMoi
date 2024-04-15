import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../utils/constant'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const MemberInfo = ({ member }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const getUserData = async () => {
            axios.get(`${url}/user/findUserByUserId/${member}`).then((res) => {
                setUserData(res.data)
            })
        }
        getUserData()
    }, [member])

    return (
        <TouchableOpacity style={styles.wrap}>
            <Image
                source={{ uri: userData?.avatar }}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginLeft: 20,
                }}
            />
            <Text style={styles.userName}>{userData?.userName}</Text>
            <TouchableOpacity style={styles.btn}>
                <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MemberInfo

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    userName: {
        marginLeft: 10,
        fontSize: 18,
        color: 'black',
        flex: 1,
    },
    btn: {
        paddingHorizontal: 10,
    },
})
