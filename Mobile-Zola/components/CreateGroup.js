import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'

const list = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        avatar: 'https://res.cloudinary.com/dpj4kdkxj/image/upload/v1711876036/image_rzag2e.jpg',
        phoneNumber: '0123456789',
    },
    {
        id: 2,
        name: 'Nguyễn Văn B',
        avatar: 'https://res.cloudinary.com/dpj4kdkxj/image/upload/v1711876036/image_rzag2e.jpg',
        phoneNumber: '0123456799',
    },
    {
        id: 3,
        name: 'Trần Văn C',
        avatar: 'https://res.cloudinary.com/dpj4kdkxj/image/upload/v1711876036/image_rzag2e.jpg',
        phoneNumber: '0123456788',
    },
    {
        id: 4,
        name: 'Nguyễn Văn D',
        avatar: 'https://res.cloudinary.com/dpj4kdkxj/image/upload/v1711876036/image_rzag2e.jpg',
        phoneNumber: '0123456777',
    },
    {
        id: 5,
        name: 'Lê Văn E',
        avatar: 'https://res.cloudinary.com/dpj4kdkxj/image/upload/v1711876036/image_rzag2e.jpg',
        phoneNumber: '0123456666',
    },
]

const CreateGroup = () => {
    const [search, setSearch] = useState('')
    const [members, setMembers] = useState([])
    const [groupName, setGroupName] = useState('')
    const [groupAvatar, setGroupAvatar] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(list)
    }, [])

    const removeAccents = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }
    const handleFindUser = (search) => {
        setSearch(search)
        if (search === '') {
            setUsers(list)
        } else {
            setUsers(
                list.filter(
                    (user) =>
                        user.phoneNumber.includes(search) ||
                        removeAccents(user.name)
                            .toLowerCase()
                            .includes(removeAccents(search).toLowerCase()),
                ),
            )
        }
    }

    return (
        <View style={style.container}>
            <View style={style.groupInfo}>
                <Image
                    style={style.groupAvatar}
                    source={require('../image/file.png')}
                />
                <TextInput
                    style={style.groupName}
                    placeholder="Dặt tên nhóm"
                    value={groupName}
                    onChangeText={(text) => setGroupName(text)}
                />
            </View>
            <View style={style.search}>
                <TextInput
                    style={style.searchFriends}
                    placeholder="Tìm tên hoặc số điện thoại"
                    value={search}
                    onChangeText={(text) => handleFindUser(text)}
                />
            </View>
            <View style={style.chooseMember}>
                <ScrollView>
                    {users.map((user) => (
                        <TouchableOpacity
                            key={user.id}
                            style={style.userFriend}
                            onPress={() => {
                                if (members.includes(user)) {
                                    setMembers(
                                        members.filter(
                                            (item) => item.id !== user.id,
                                        ),
                                    )
                                } else {
                                    setMembers([...members, user])
                                }
                            }}
                        >
                            <Image
                                style={style.userAvatar}
                                source={{ uri: user.avatar }}
                            />
                            <Text style={style.groupName}>{user.name}</Text>
                            {members.includes(user) ? (
                                <Feather
                                    name="check-square"
                                    size={24}
                                    color="black"
                                />
                            ) : (
                                <Feather
                                    name="square"
                                    size={24}
                                    color="black"
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={style.btnWrap}>
                <TouchableOpacity style={style.btn}>
                    <Text style={style.btnText}>Tạo nhóm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateGroup

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    groupInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: windowHeight * 0.02,
        marginHorizontal: windowWidth * 0.05,
    },
    groupAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    groupName: {
        marginLeft: 10,
        fontSize: 18,
        flex: 1,
    },
    search: {
        marginBottom: windowHeight * 0.02,

        marginHorizontal: windowWidth * 0.05,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        paddingHorizontal: 10,
    },
    searchFriends: {
        height: 40,
        fontSize: 17,
    },
    chooseMember: {
        flex: 1,
    },
    userFriend: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: windowWidth * 0.05,
        marginVertical: windowHeight * 0.01,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    btnWrap: {
        height: windowHeight * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.06,
        backgroundColor: '#1B96CB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
    },
})
