import {
    Alert,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login2 = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState()
    const [password, setPassword] = useState()
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('AuthToken')
                if (token) {
                    navigation.navigate('Message')
                }
            } catch (error) {
                console.log(error)
            }
        }
        checkLoginStatus()
    }, [])

    const handleLogin = () => {
        //kiểm tra hợp lệ
        /*if (phoneNumber == null || password == null) {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        //gửi request lên server
        fetch(`http://172.21.73.92:3000/account/login?phoneNumber=${phoneNumber}`)
            .then((res) => res.json())
            .then((data) => {
                if (data == 'Account not found') {
                    alert('Tài khoản không tồn tại')
                } else {
                    if (data.password == password) {
                        alert('Đăng nhập thành công')
                        navigation.navigate('Message')
                    } else {
                        alert('Mật khẩu không đúng')
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })*/
        const account = {
            phoneNumber: phoneNumber,
            password: password,
        }
        axios
            .post('http://192.168.1.11:3000/account/login', account)
            .then((res) => {
                console.log(res)
                const token = res.data.token
                AsyncStorage.setItem('AuthToken', token)
                navigation.navigate('Message')
            })
            .catch((err) => {
                Alert.alert(
                    'Login failure!!!',
                    'Please check your username or password again!',
                )
                console.log('Error at login', err)
            })
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign
                            style={styles.back}
                            name="left"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <Text style={styles.login}>Đăng nhập</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.direction}>
                        Vui lòng nhập số điện thoại và mật khẩu để đăng nhập
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        onChangeText={setPhoneNumber}
                    />
                    <TextInput
                        onChangeText={setPassword}
                        style={styles.input}
                        placeholder="Mật khẩu"
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.getPwd}>
                        <Text style={styles.txtGetPwd}>Lấy lại mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={handleLogin}
                    >
                        <Text style={styles.txtLogin}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#1B96CB',
    },
    login: {
        color: 'white',
        fontSize: 20,
        marginLeft: 15,
        fontWeight: 'bold',
    },
    back: {
        marginLeft: 15,
    },
    direction: {
        fontSize: 17,
        marginTop: 10,
        marginLeft: 10,
        textAlign: 'center',
        padding: 5,
        paddingHorizontal: 30,
    },
    info: {
        //alignItems: 'center',
    },
    input: {
        width: 360,
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        margin: 10,
        padding: 10,
        fontSize: 17,
    },

    getPwd: {
        marginLeft: 15,
    },
    txtGetPwd: {
        color: '#1B96CB',
        fontSize: 18,
    },
    btnLogin: {
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center',
        width: 200,
        height: 40,
        backgroundColor: '#1B96CB',
        borderRadius: 20,
        alignSelf: 'center',
    },
    txtLogin: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
    },
})
