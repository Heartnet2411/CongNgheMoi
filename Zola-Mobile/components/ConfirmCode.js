import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import firestore from '@react-native-firebase/firestore'

const ConfirmCode = ({ navigation, route }) => {
    const confirm = route.params.confirm
    const phoneNumber = route.params.phoneNumber

    const confirmCode = async (code) => {
        try {
            const userCredential = await confirm.confirm(code)
            const user = userCredential.user

            const userDoc = await firestore()
                .collection('users')
                .doc(user.uid)
                .get()
            if (!userDoc.exists) {
                firestore().collection('users').doc(user.uid).set({
                    phoneNumber: user.phoneNumber,
                })
            }
            navigation.navigate('Message')
        } catch (error) {
            console.log(error)
        }
    }

    const inputRefs = useRef([])
    const [code, setCode] = React.useState('')
    const [input1, setInput1] = React.useState('')
    const [input2, setInput2] = React.useState('')
    const [input3, setInput3] = React.useState('')
    const [input4, setInput4] = React.useState('')
    const [input5, setInput5] = React.useState('')

    const handleTextChange = (index, value) => {
        switch (index) {
            case 0:
                setInput1(value)
                break
            case 1:
                setInput2(value)
                break
            case 2:
                setInput3(value)
                break
            case 3:
                setInput4(value)
                break
            case 4:
                setInput5(value)
                break
            case 5:
                setCode(input1 + input2 + input3 + input4 + input5 + value)
                break
        }
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus()
        }
        if (value.length === 0 && index > 0) {
            inputRefs.current[index - 1].focus()
            setCode('')
        }
        console.log(index)
    }

    console.log(input1, input2, input3, input4, input5)
    console.log(code)

    return (
        <SafeAreaView style={styles.containerConfirm}>
            <Text style={styles.headerTextConfirmConfirm}>
                Xác nhận số điện thoại
            </Text>
            <Text style={styles.infoConfirm}>
                Hãy nhập mã xác nhận mà chúng tôi đã gửi đến số điện thoại của
                bạn.
            </Text>
            <Text style={styles.authText}>Nhập mã xác nhận:</Text>
            <View style={styles.inputAuth}>
                {[...Array(6)].map((_, index) => (
                    <View style={styles.inputWrap} key={index}>
                        <TextInput
                            key={index}
                            style={styles.authInput}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(value) => {
                                handleTextChange(index, value)
                            }}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                        />
                    </View>
                ))}
            </View>

            <TouchableOpacity
                style={styles.buttonAuth}
                onPress={() => confirmCode(code)}
            >
                <Text style={styles.buttonAuthText}>Xác nhận</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ConfirmCode

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
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
    inputWrap: {
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
        width: windowWidth * 0.1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 20,
        paddingLeft: 10,
        marginRight: 10,
    },
    authInput: {
        width: windowWidth * 0.05,
        height: 40,

        fontSize: 20,
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
