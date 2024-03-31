import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'
import RadioGroup from 'react-native-radio-buttons-group'
import React, { useMemo, useState, useEffect } from 'react'
import { primaryColor } from '../utils/constant'
import { url } from '../utils/constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { decode } from 'base-64'

global.atob = decode

export default function Tab({ route, navigation }) {
    const radioButtons = useMemo(
        () => [
            {
                id: '1', // acts as primary key, should be unique and non-empty string
                label: 'Nam',
                value: 'Male',
            },
            {
                id: '2',
                label: 'Nữ',
                value: 'Female',
            },
        ],
        [],
    )

    console.log(firstName, lastName)

    const fetchUser = async () => {
        const token = await AsyncStorage.getItem('AuthToken')
        const decodedToken = jwtDecode(token)
        const account_id = decodedToken.accountId

        fetch(url + `/user/findUser?account_id=${account_id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setUser(data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    React.useEffect(() => {
        fetchUser()
        if (user.gender === 'Nam') {
            setSelectedId('1')
        } else if (user.gender === 'Nữ') {
            setSelectedId('2')
        }
    }, [])

    const [user, setUser] = useState({})
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth)
    const [selectedId, setSelectedId] = useState(
        user.gender === 'Nam' ? '2' : '1',
    )

    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <View style={styles.infoWview}>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderColor: '#ccc',
                            width: '90%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextInput
                            style={styles.info}
                            placeholder=""
                            defaultValue={user.firstName}
                            onChangeText={(text) => setFirstName(text)}
                        />
                        <AntDesign name="edit" size={22} color="black" />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderColor: '#ccc',
                            width: '90%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextInput
                            style={styles.info}
                            placeholder=""
                            defaultValue={user.lastName}
                            onChangeText={(value) => setLastName(value)}
                        />
                        <AntDesign name="edit" size={22} color="black" />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderColor: '#ccc',
                            width: '90%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextInput
                            style={styles.info}
                            placeholder=""
                            defaultValue={user.dateOfBirth}
                        />
                        <TouchableOpacity>
                            <AntDesign name="edit" size={22} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={setSelectedId}
                            selectedId={selectedId}
                            layout="row"
                            containerStyle={{
                                width: '80%',
                                justifyContent: 'space-around',
                                marginTop: 20,
                            }}
                            labelStyle={{ fontSize: 18 }}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text
                    style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}
                >
                    LƯU
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    wrap: {
        flexDirection: 'row',
        marginTop: 10,
    },
    avatarView: {
        width: '30%',
    },
    infoWview: {
        width: '80%',
    },
    info: {
        width: 200,
        height: 30,
        fontSize: 18,
        borderColor: '#ccc',
        marginHorizontal: 10,
        marginTop: 12,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    btn: {
        width: '90%',
        height: 40,
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 30,
    },
})
