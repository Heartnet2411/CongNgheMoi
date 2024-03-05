import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Alert,
    Modal,
    Pressable,
} from 'react-native'
import React from 'react'
import { K2D_700Bold, useFonts } from '@expo-google-fonts/k2d'
import { Inter_600SemiBold } from '@expo-google-fonts/inter'
import { primaryColor } from '../utils/constant'
import { Entypo, FontAwesome5, FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'
import Tab from '../components/Tab'
const Login = ({ navigation, route }) => {
    useFonts({ K2D_700Bold })
    useFonts({ Inter_600SemiBold })
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <Image
                        source={{
                            uri: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2023/11/league-of-legends-season-14-release-date.jpg',
                        }}
                        style={styles.background}
                    />
                    <Image
                        source={{
                            uri: 'https://cdn.mos.cms.futurecdn.net/JvAPvpMvwgdfm2QVWoLiYS.jpg',
                        }}
                        style={styles.avatar}
                    />
                </View>
                <Text style={styles.userName}>Nguyễn Văn Thuận </Text>
                <View style={{ marginTop: 40 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(true)}
                    >
                        <FontAwesome5 name="sync-alt" size={24} color="blue" />
                        <Text style={styles.buttonText}>
                            Đổi thông tin tài khoản
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('EditPassword')}
                    >
                        <Entypo name="lock" size={24} color="blue" />
                        <Text style={styles.buttonText}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Entypo name="log-out" size={24} color="blue" />
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
                            <Text style={styles.buttonText}>Đổi ảnh bìa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>
                                Đổi ảnh đại diện
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('EditInfo')}
                        >
                            <Text style={styles.buttonText}>Đổi thông tin</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    background: {
        width: '100%',
        height: 300,
        backgroundColor: '#ccc',
        objectFit: 'cover',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#fff',
        position: 'absolute',
        bottom: -75,
        left: 20,
        objectFit: 'cover',
    },
    userName: {
        fontFamily: 'K2D_700Bold',
        fontSize: 25,
        color: '#000',
        left: 180,
        width: 220,
    },

    button: {
        backgroundColor: '#fff',
        width: 300,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 2,
        borderColor: primaryColor,
        flexDirection: 'row',
    },
    buttonText: {
        fontFamily: 'K2D_700Bold',
        fontSize: 18,
        marginLeft: 10,
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
        right: 0,
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
