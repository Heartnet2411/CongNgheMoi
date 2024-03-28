import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'
import RadioGroup from 'react-native-radio-buttons-group'
import React, { useMemo, useState } from 'react'
import { primaryColor } from '../utils/constant'

export default function Tab({ route, navigation }) {
    const radioButtons = useMemo(
        () => [
            {
                id: '1', // acts as primary key, should be unique and non-empty string
                label: 'Nam',
                value: 'Male',
            },
            {
                id: '2',
                label: 'Nữ',
                value: 'Female',
            },
        ],
        [],
    )

    const [selectedId, setSelectedId] = useState()
    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <View style={styles.avatarView}>
                    <View style={{ position: 'relative' }}>
                        <Image
                            source={{
                                uri: 'https://cdn.mos.cms.futurecdn.net/JvAPvpMvwgdfm2QVWoLiYS.jpg',
                            }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.changeAvtBtn}>
                            <Feather name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.infoWview}>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderColor: '#ccc',
                            width: '90%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextInput
                            style={styles.info}
                            placeholder="Họ và tên"
                        />
                        <AntDesign name="edit" size={24} color="black" />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderColor: '#ccc',
                            width: '90%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextInput
                            style={styles.info}
                            placeholder="Họ và tên"
                        />
                        <AntDesign name="edit" size={24} color="black" />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={setSelectedId}
                            selectedId={selectedId}
                            layout="row"
                            containerStyle={{
                                width: '80%',
                                justifyContent: 'space-around',
                                marginTop: 20,
                            }}
                            labelStyle={{ fontSize: 18 }}
                        />
                    </View>
                    
                </View>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text
                    style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}
                >
                    LƯU
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    wrap: {
        flexDirection: 'row',
        marginTop: 20,
    },
    avatarView: {
        width: '30%',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 20,
        position: 'relative',
    },
    changeAvtBtn: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    infoWview: {
        width: '70%',
    },
    info: {
        width: 200,
        height: 30,
        fontSize: 18,
        borderColor: '#ccc',
        margin: 10,
        paddingHorizontal: 10,
    },
    btn: {
        width: '90%',
        height: 40,
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 30,
    },
})
