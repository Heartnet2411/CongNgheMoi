import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    Modal,
    Pressable,
    Dimensions,
} from 'react-native'
import React, { useEffect } from 'react'
import { K2D_700Bold, useFonts } from '@expo-google-fonts/k2d'
import { Inter_600SemiBold } from '@expo-google-fonts/inter'
import { primaryColor } from '../utils/constant'
import {
    Entypo,
    AntDesign,
    FontAwesome,
    MaterialIcons,
} from '@expo/vector-icons'
import { useState } from 'react'
import Tab from '../components/Tab'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { decode } from 'base-64'

global.atob = decode

const Login = ({ navigation, route }) => {
    useFonts({ K2D_700Bold })
    useFonts({ Inter_600SemiBold })
    const [modalVisible, setModalVisible] = useState(false)

    const [user, setUser] = useState([])

    React.useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('AuthToken')
            const decodedToken = jwtDecode(token)
            const account_id = decodedToken.accountId

            fetch(
                `http://192.168.1.11:3000/user/findUser?account_id=${account_id}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
                .then((res) => res.json())
                .then((data) => {
                    setUser(data)
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        }
        fetchUser()
    }, [])

    const handleLogout = () => {
        Alert.alert(
            'Bạn có chắc chắn muốn đăng xuất?',
            'Nhập "ok" để xác nhận đăng xuất khỏi ứng dụng.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        AsyncStorage.removeItem('AuthToken')
                        navigation.navigate('Login')
                    },
                },
            ],
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    height: windowHeight * 0.92,
                }}
            >
                <View>
                    <Image
                        source={{
                            uri: user.coverImage,
                        }}
                        style={styles.background}
                    />
                    <Image
                        source={{
                            uri: user.avatar,
                        }}
                        style={styles.avatar}
                    />
                </View>
                <Text style={styles.userName}>{user.userName}</Text>

                <View style={styles.infor}>
                    <Text style={styles.inforHeader}>Thông tin cá nhân</Text>
                    <View style={styles.inforWrap}>
                        <Text style={styles.inforKey}>Giới tính</Text>
                        <Text style={styles.inforValue}>{user.gender}</Text>
                    </View>
                    <View style={styles.inforWrap}>
                        <Text style={styles.inforKey}>Ngày sinh</Text>
                        <Text style={styles.inforValue}>
                            {user.dateOfBirth}
                        </Text>
                    </View>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginHorizontal: 20,
                                marginTop: 10,
                                marginBottom: 10,
                                paddingVertical: 5,
                            }}
                        >
                            <Text style={styles.inforKey}>Điện thoại</Text>
                            <Text style={styles.inforValue}>
                                {user.phoneNumber}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.buttonEdit}
                            onPress={() => setModalVisible(true)}
                        >
                            <AntDesign name="edit" size={20} color="black" />
                            <Text style={styles.buttonText}>
                                Chỉnh sửa thông tin
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        marginBottom: 20,
                    }}
                >
                    <TouchableOpacity
                        style={styles.buttonMain}
                        onPress={() => handleLogout()}
                    >
                        <Entypo name="log-out" size={20} color="black" />
                        <Text style={styles.buttonText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.button}>
                            <Entypo name="images" size={20} color="black" />
                            <Text style={styles.buttonText}>Đổi ảnh bìa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Entypo name="images" size={20} color="black" />
                            <Text style={styles.buttonText}>
                                Đổi ảnh đại diện
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                navigation.navigate('EditInfo')
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <MaterialIcons
                                name="featured-play-list"
                                size={20}
                                color="black"
                            />
                            <Text style={styles.buttonText}>Đổi thông tin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('EditPassword')}
                        >
                            <Entypo name="lock" size={20} color="black" />
                            <Text style={styles.buttonText}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <FontAwesome name="close" size={30} color="black" />
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Tab />
        </SafeAreaView>
    )
}

export default Login

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: windowWidth,
        height: windowHeight,
    },

    background: {
        width: '100%',
        height: windowHeight * 0.3,
        backgroundColor: '#ccc',
        objectFit: 'cover',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    avatar: {
        width: windowWidth * 0.28,
        height: windowWidth * 0.28,
        borderRadius: windowWidth * 0.14,
        borderWidth: 2,
        borderColor: '#fff',
        position: 'absolute',
        bottom: -windowWidth * 0.14,
        left: windowWidth * 0.5 - windowWidth * 0.14,
        objectFit: 'cover',
    },
    userName: {
        fontFamily: 'K2D_700Bold',
        fontSize: 27,
        color: '#000',
        width: windowWidth * 0.7,
        marginTop: windowWidth * 0.14,
        textAlign: 'center',
        alignSelf: 'center',
    },

    button: {
        backgroundColor: '#fff',
        width: windowWidth * 0.6,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 2,
        borderColor: primaryColor,
        flexDirection: 'row',
    },
    buttonMain: {
        backgroundColor: '#fff',
        width: windowWidth * 0.45,
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E72929',
        flexDirection: 'row',
    },
    buttonEdit: {
        backgroundColor: '#fff',
        width: windowWidth * 0.9,
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#424242',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 10,
    },

    infor: {
        width: windowWidth,
        flex: 1,
        marginTop: 20,
    },
    inforHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
        marginLeft: 20,
    },
    inforWrap: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 5,
    },
    inforKey: {
        fontSize: 17,
        color: '#000',
        width: windowWidth * 0.3,
    },
    inforValue: {
        fontSize: 17,
        color: '#000',
        alignSelf: 'flex-start',
        flex: 1,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonS: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        position: 'absolute',
        top: 0,
        right: 10,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})
