import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native'
import { primaryColor } from '../utils/constant'
import React, { useMemo, useState } from 'react'

export default function Tab({ route, navigation }) {
    const [isVisible, setIsVisible] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reNewPassword, setReNewPassword] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <View style={styles.infoWview}>
                    <TouchableOpacity
                        style={styles.visible}
                        onPress={() => setIsVisible(!isVisible)}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {isVisible ? 'ẨN' : 'HIỆN'}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.infoPassword}>
                        Nhập mật khẩu hiện tại:
                    </Text>
                    <TextInput
                        style={[styles.info, { marginTop: 5 }]}
                        placeholder="Nhập mật hiện tại"
                        secureTextEntry={isVisible ? false : true}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <Text style={styles.infoPassword}>Nhập mật khẩu mới:</Text>
                    <TextInput
                        style={[styles.info, { marginTop: 5 }]}
                        placeholder="Nhập mật khẩu mới của bạn"
                        secureTextEntry={isVisible ? false : true}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextInput
                        style={[styles.info, { marginTop: 10 }]}
                        placeholder="Nhập lại mật khẩu mới của bạn"
                        secureTextEntry={isVisible ? false : true}
                        onChange={(e) => setReNewPassword(e.target.value)}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={[styles.btn, { backgroundColor: primaryColor }]}
                disabled={
                    oldPassword === '' ||
                    newPassword === '' ||
                    reNewPassword === ''
                        ? true
                        : false
                }
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Cập nhật
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrap: {
        justifyContent: 'center',
    },
    avatarView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    infoWview: {
        width: '100%',
        paddingHorizontal: 20,
        position: 'relative',
    },
    infoPassword: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    info: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        fontSize: 18,
    },
    btn: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 30,
    },
    visible: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 100,
    },
})
