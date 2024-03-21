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
import firestore from '@react-native-firebase/firestore'
import { useRef } from 'react'

const PhoneInput = ({ navigation, route }) => {
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [confirm, setConfirm] = React.useState(null)

    const inputRefs = useRef([])
    const [code, setCode] = React.useState('')
    const [input1, setInput1] = React.useState('')
    const [input2, setInput2] = React.useState('')
    const [input3, setInput3] = React.useState('')
    const [input4, setInput4] = React.useState('')
    const [input5, setInput5] = React.useState('')

    const signUpPhoneNumber = async (phoneNumber) => {
        const formattedPhoneNumber = '+84' + phoneNumber.substring(1)
        try {
            const confirm = await auth().signInWithPhoneNumber(
                formattedPhoneNumber,
            )
            setConfirm(confirm)
        } catch (error) {
            Alert.alert('Thông báo', 'Có lỗi xảy ra xin vui lòng thử lại sau.')
            console.log(error)
        }
    }

    const confirmCode = async (code) => {
        try {
            const isConfirm = await confirm.confirm(code)
            if (isConfirm) {
                navigation.navigate('Register', { phoneNumber: phoneNumber })
            } else {
                Alert.alert('Thông báo', 'Mã xác nhận không hợp lệ')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        //Regular expression cho mã xác nhận chỉ chứa 6 chữ số
        const regex = /^[0-9]{6}$/g
        if (code.match(regex)) {
            console.log('code', code)
            confirmCode(code)
        } else {
            Alert.alert('Thông báo', 'Mã xác nhận không hợp lệ')
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
            {!confirm ? (
                <>
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.headerText}>Đăng ký tài khoản</Text>
                        <Text style={styles.info}>
                            Hãy nhập số điện thoại của bạn để đăng ký tài khoản.
                            Để xác nhận đây không phải là số điện thoại giả mạo,
                            chúng tôi sẽ gửi mã xác nhận đến số điện thoại của
                            bạn.
                        </Text>
                        <View style={styles.input}>
                            <Text style={styles.phoneText}>
                                Nhập số điện thoại:
                            </Text>

                            <TextInput
                                style={styles.phoneInput}
                                placeholder="e.g., 0123456789"
                                keyboardType="numeric"
                                onChangeText={(text) => setPhoneNumber(text)}
                                value={phoneNumber}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => testPhoneNumber(phoneNumber)}
                        >
                            <Text style={styles.buttonText}>Tiếp theo</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </>
            ) : (
                <>
                    <SafeAreaView style={styles.containerConfirm}>
                        <Text style={styles.headerTextConfirmConfirm}>
                            Xác nhận số điện thoại
                        </Text>
                        <Text style={styles.infoConfirm}>
                            Hãy nhập mã xác nhận mà chúng tôi đã gửi đến số điện
                            thoại của bạn.
                        </Text>
                        <Text style={styles.authText}>Nhập mã xác nhận:</Text>

                        <TextInput
                            style={styles.authInput}
                            maxLength={6}
                            keyboardType="numeric"
                            onChangeText={(value) => {
                                setCode(value)
                            }}
                        />

                        <TouchableOpacity
                            style={styles.buttonAuth}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={styles.buttonAuthText}>Xác nhận</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </>
            )}
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
        position: 'relative',
    },
    headerText: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: windowHeight * 0.12,
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
        marginTop: windowHeight * 0.12,
        width: '80%',
    },
    phoneText: {
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
    },

    button: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: '#5D5AFE',
        width: windowWidth * 0.4,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerConfirm: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        position: 'relative',
    },
    headerTextConfirm: {
        fontSize: 30,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center',
        marginTop: 50,
        width: '90%',
    },
    infoConfirm: {
        fontSize: 17,
        textAlign: 'center',
        marginTop: 50,
        marginHorizontal: 20,
        width: '80%',
        color: '#808080',
    },
    inputAuth: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    authText: {
        fontSize: 20,
        fontFamily: 'Inter_600SemiBold',
        marginTop: 20,
    },

    authInput: {
        width: windowWidth * 0.5,
        height: 40,
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 10,

        fontSize: 17,
        padding: 5,
        paddingHorizontal: 15,
    },
    buttonAuth: {
        backgroundColor: '#5D5AFE',
        width: windowWidth * 0.5,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        position: 'absolute',
        bottom: 50,
    },
    buttonAuthText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Inter_600SemiBold',
    },
})
