import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Keyboard,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'
import Tab from '../components/Tab'
import { SafeAreaView } from 'react-native-safe-area-context'

const Cloud = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AntDesign
                    style={styles.iconCloud}
                    name="cloudo"
                    size={35}
                    color="white"
                />
                <Text style={styles.txtHeader}>Cloud của tôi</Text>
            </View>
            <View style={styles.body}>
                <Text>xhat</Text>
            </View>
            <Tab />
            <View style={styles.chat}>
                <TouchableOpacity style={styles.iconemj}>
                    <Entypo name="emoji-happy" size={26} color="black" />
                </TouchableOpacity>
                <TextInput
                    keyboardType="default"
                    placeholder="Tin nhắn"
                    placeholderTextColor={'gray'}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.iconattach}>
                    <MaterialIcons name="attachment" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconSend}>
                    <MaterialIcons name="send" size={26} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Cloud

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: windowHeight,
    },
    header: {
        height: 60,
        width: windowWidth,
        backgroundColor: '#086dff',
        flexDirection: 'row',
        alignItems: 'center',
        height: windowHeight * 0.08,
    },
    txtHeader: {
        color: '#fff',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 19,
        fontWeight: '700',
        marginLeft: 10,
    },
    iconCloud: {
        marginLeft: windowWidth * 0.05,
    },
    body: {
        width: windowWidth,
        height: windowHeight * 0.8,
        flex: 1,
        backgroundColor: '#e6e6e6',
        position: 'relative',
    },
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        position: 'absolute',
        bottom: windowHeight * 0.08,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    iconemj: {
        width: windowWidth * 0.1,
        alignItems: 'center',
    },
    input: {
        width: windowWidth * 0.6,
        height: 45,
        borderRadius: 10,
        fontSize: 17,
    },
    iconattach: {
        width: windowWidth * 0.1,
        alignItems: 'center',
    },
    iconSend: {
        width: windowWidth * 0.1,
        alignItems: 'center',
    },
})
