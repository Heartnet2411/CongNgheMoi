import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../utils/constant'
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons'

const MemberKey = ({ member }) => {
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
            <View style={{ position: 'relative' }}>
                <Image
                    source={{ uri: userData?.avatar }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginLeft: 20,
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: '#ccc',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Foundation name="key" size={14} color="gold" />
                </View>
            </View>

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

export default MemberKey

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
