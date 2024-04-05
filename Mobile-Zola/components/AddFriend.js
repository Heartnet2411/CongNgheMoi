import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    Dimensions,
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { UserType } from '../UserContext'

const AddFriend = ({ navigation, route }) => {
    const { accountId, setAccountId } = useContext(UserType)
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('AuthToken')
            const decodedToken = jwtDecode(token)
            const accountId = decodedToken.accountId
            setAccountId(accountId)
            axios
                .get(`http://localhost:3000/user/findAllUsers`)
                .then((res) => {
                    setUsers(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchUser()
    }, [])
    console.log(users)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập số điện thoại"
                />
                <TouchableOpacity>
                    <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.recommend}>
                <Text style={styles.txtRecommend}>Danh sách gợi ý</Text>
                <FlatList
                    data={users}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <View style={styles.contact}>
                                <Image
                                    source={item.avatar}
                                    style={styles.avatar}
                                />
                                <Text style={styles.name}>
                                    {item.firstName}
                                </Text>
                                <TouchableOpacity style={styles.add}>
                                    <AntDesign
                                        name="adduser"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

export default AddFriend

const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10,
    },
    input: {
        width: 300,
        height: 40,
        backgroundColor: '#E5E5E5',
        borderRadius: 10,
        paddingLeft: 10,
    },
    recommend: {
        marginTop: 10,
    },
    txtRecommend: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    list: {
        height: Math.round(windowHeight) - 60,
    },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        marginLeft: 30,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    add: {
        marginLeft: 150,
    },
})
