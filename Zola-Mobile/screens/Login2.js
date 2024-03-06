import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'




const Login2 = ({navigation}) => {
    const [phoneNumber,setPhoneNumber]= useState();
    const [password,setPassword]= useState();
    const handleLogin = ()=>{
        //kiểm tra hợp lệ
        if(phoneNumber==null||password==null){
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        //gửi request lên server
        fetch(`http://localhost:3000/account/login?phoneNumber=${phoneNumber}`)
        .then(res=>res.json())
        .then(data=>{
            if(data=="Account not found"){
                alert("Tài khoản không tồn tại");
            }else{
                if(data.password==password){
                    alert("Đăng nhập thành công");
                    navigation.navigate('Message');

                }else{
                    alert("Mật khẩu không đúng");
                }
            }
        })
        .catch(err=>{
            console.log(err);
        })
     }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AntDesign
                    style={styles.back}
                    name="left"
                    size={24}
                    color="white"
                />
                <Text style={styles.login}>Đăng nhập</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.direction}>
                    Vui lòng nhập số điện thoại và mật khẩu để đăng nhập
                </Text>
                <TextInput style={styles.input} placeholder="Số điện thoại" onChangeText={setPhoneNumber} />
                <TextInput onChangeText={setPassword}
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.getPwd}>
                    <Text style={styles.txtGetPwd
                    }>Lấy lại mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                    <Text style={styles.txtLogin}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 18,
        marginLeft: 15,
    },
    back: {
        marginLeft: 15,
    },
    direction: {
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10,
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
    },

    getPwd: {
        marginLeft:15,
    },
    txtGetPwd: {
        color: '#1B96CB',
        fontWeight:600,
        fontSize:18,
    },
    btnLogin: {
        alignItems: 'center',
        marginTop:20,
        justifyContent: 'center',
        width: 200,
        height: 40,
        backgroundColor: '#1B96CB',
        borderRadius: 20,
        alignSelf:'center'
    },
    txtLogin: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
    },
})
