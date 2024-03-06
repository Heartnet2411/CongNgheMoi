import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { K2D_700Bold, useFonts } from '@expo-google-fonts/k2d'
import { Inter_600SemiBold } from '@expo-google-fonts/inter'
const Login = ({ navigation, route }) => {
    useFonts({ K2D_700Bold })
    useFonts({ Inter_600SemiBold })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.txtZola}>Zola</Text>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={() => navigation.navigate('Login2')}
                >
                    <Text style={styles.txtLogin}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRegis}>
                    <Text style={styles.txtRegis}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtZola: {
        fontSize: 100,
        color: '#1B96CB',
        fontFamily: 'K2D_700Bold',
        marginTop: 150,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
    },
    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 40,
        backgroundColor: '#5D5AFE',
        borderRadius: 20,
    },
    txtLogin: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
    },
    btnRegis: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        marginTop: 20,
    },
    txtRegis: {
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
    },
})
