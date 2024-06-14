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
import { url } from '../utils/constant'

const PhoneInput = ({ navigation, route }) => {
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const type = route.params.type
    let oldPhoneNumber = ''
    if (route.params.oldPhoneNumber)
        oldPhoneNumber = route.params.oldPhoneNumber

    console.log(type)

    const signUpPhoneNumber = async (phoneNumber) => {
        try {
            fetch(
                url +
                    `/account/find-account-by-phone-number?phoneNumber=${phoneNumber}`,
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (type === 'register') {
                        if (data === 'Account not found!!!') {
                            sendOPT(phoneNumber)
                            // navigation.navigate('Register', {
                            //     phoneNumber: phoneNumber,
                            // })
                        } else {
                            Alert.alert('Thông báo', 'Số điện thoại đã tồn tại')
                        }
                    } else if (type === 'forgotPassword') {
                        if (data === 'Account not found!!!') {
                            Alert.alert('Thông báo', 'Tài khoản không tồn tại.')
                        } else {
                            sendOPT(phoneNumber)
                            // navigation.navigate('EditNewPassword', {
                            //     phoneNumber: phoneNumber,
                            // })
                        }
                    } else if (type === 'changePhoneNumber') {
                        if (data === 'Account not found!!!') {
                            sendOPT(phoneNumber)
                            // navigation.navigate('ChangePhoneNumber', {
                            //     phoneNumber: phoneNumber,
                            // })
                        } else {
                            Alert.alert('Thông báo', 'Số điện thoại đã tồn tại')
                        }
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
                type: type,
                oldPhoneNumber: oldPhoneNumber,
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
                    <Text style={styles.headerText}>Nhập số điện thoại</Text>
                    <Text style={styles.info}>
                        Để tiếp tục, vui lòng nhập số điện thoại của bạn. Chúng
                        tôi sẽ gửi mã xác nhận đến số điện thoại của bạn. Hãy
                        chắc chắn rằng bạn có thể truy cập vào số điện thoại
                        này.
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
