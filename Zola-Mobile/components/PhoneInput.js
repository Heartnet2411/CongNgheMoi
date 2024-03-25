import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import auth from '@react-native-firebase/auth'

const PhoneInput = ({ navigation, route }) => {
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [confirm, setConfirm] = React.useState(null)
    const [code, setCode] = React.useState('')
    const [input1, setInput1] = React.useState('')
    const [input2, setInput2] = React.useState('')
    const [input3, setInput3] = React.useState('')
    const [input4, setInput4] = React.useState('')
    const [input5, setInput5] = React.useState('')

    const signUpPhoneNumber = async (phoneNumber) => {
        try {
            fetch(
                `http://192.168.1.13:3000/account/login?phoneNumber=${phoneNumber}`,
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data == 'Account not found!!!') {
                        // sendOPT(phoneNumber)
                        navigation.navigate('Register', {
                            phoneNumber: phoneNumber,
                        })
                    } else {
                        Alert.alert('Thông báo', 'Tài khoản đã tồn tại')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            Alert.alert('Thông báo', 'Có lỗi xảy ra xin vui lòng thử lại sau.')
            console.log(error)
        }
    }

    const sendOPT = async (phoneNumber) => {
        const formattedPhoneNumber = '+84' + phoneNumber.substring(1)
        try {
            const confirm = await auth().signInWithPhoneNumber(
                formattedPhoneNumber,
            )
            navigation.navigate('ConfirmCode', {
                confirm: confirm,
                phoneNumber: phoneNumber,
            })
        } catch (error) {
            Alert.alert('Thông báo', 'Có lỗi xảy ra xin vui lòng thử lại sau.')
            console.log(error)
        }
    }

    const testPhoneNumber = (phoneNumber) => {
        //regular expression cho số điện thoại bắt đầu bằng số 0 và có 10 chữ số
        const regex = /^(0)[0-9]{9}$/
        if (phoneNumber === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại')
        } else if (!phoneNumber.match(regex)) {
            Alert.alert('Thông báo', 'Số điện thoại không hợp lệ')
        } else {
            signUpPhoneNumber(phoneNumber)
        }
    }

    return (
        <SafeAreaView style={styles.screenWrap}>
            <SafeAreaView style={styles.container}>
                <View style={styles.textWrap}>
                    <Text style={styles.headerText}>Đăng ký tài khoản</Text>
                    <Text style={styles.info}>
                        Hãy nhập số điện thoại của bạn để đăng ký tài khoản. Để
                        xác nhận đây không phải là số điện thoại giả mạo, chúng
                        tôi sẽ gửi mã xác nhận đến số điện thoại của bạn.
                    </Text>
                </View>
                <View style={styles.input}>
                    <Text style={styles.phoneText}>Nhập số điện thoại:</Text>

                    <TextInput
                        style={styles.phoneInput}
                        placeholder="e.g., 0123456789"
                        keyboardType="numeric"
                        onChangeText={(text) => setPhoneNumber(text)}
                        value={phoneNumber}
                    />
                </View>

                <View style={styles.buttonWrap}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => testPhoneNumber(phoneNumber)}
                    >
                        <Text style={styles.buttonText}>Tiếp theo</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default PhoneInput

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    screenWrap: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        height: windowHeight,
    },
    textWrap: {
        height: windowHeight * 0.3,
        width: '100%',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    info: {
        fontSize: 17,
        textAlign: 'center',
        marginTop: 50,
        marginHorizontal: 20,
        width: '80%',
        color: '#808080',
    },
    input: {
        height: windowHeight * 0.3,
    },
    phoneText: {
        marginTop: 50,
        fontSize: 17,
        marginBottom: 10,
    },
    phoneInput: {
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        fontSize: 17,
        width: windowWidth * 0.8,
    },

    buttonWrap: {
        width: '100%',
        height: windowHeight * 0.3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#5D5AFE',
        width: windowWidth * 0.4,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
