import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    Keyboard,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'
const Cloud = () => {
    return (
        <SafeAreaView>
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
            <View style={styles.chat}>
                <TouchableOpacity>
                    <Entypo
                        style={styles.iconemj}
                        name="emoji-happy"
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>
                <TextInput
                keyboardType='default'
                    placeholder="Tin nhắn"
                    placeholderTextColor={'gray'}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.iconattach}>
                    <MaterialIcons name="attachment" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconSend}
                >
                    <MaterialIcons name="send" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Cloud
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    header: {
        height: 60,
        width: windowWidth,
        backgroundColor: '#1B96CB',
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtHeader: {
        color: '#fff',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10,
    },
    iconCloud: {
        marginLeft: 20,
    },
    body: {
        width: windowWidth,
        height: 550,
        backgroundColor: '#fff',
    },
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
    },
    iconemj: {
        marginLeft: 10,
    },
    input: {
        width: windowWidth - 150,
        height: 45,
        borderRadius: 10,
        marginLeft: 10,
    },
    iconattach: {
        marginLeft: 10,
    },
    iconSend: {
        marginLeft: 10,
    },
})
