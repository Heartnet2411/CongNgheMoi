import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import RadioGroup from 'react-native-radio-buttons-group'
import React, { useMemo, useState } from 'react'

export default function Tab({ route, navigation }) {
    const radioButtons = useMemo(
        () => [
            {
                id: '1', // acts as primary key, should be unique and non-empty string
                label: 'Option 1',
                value: 'option1',
            },
            {
                id: '2',
                label: 'Option 2',
                value: 'option2',
            },
        ],
        [],
    )

    const [selectedId, setSelectedId] = useState()
    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <View style={styles.avatarView}>
                    <Image
                        source={{
                            uri: 'https://cdn.mos.cms.futurecdn.net/JvAPvpMvwgdfm2QVWoLiYS.jpg',
                        }}
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.infoWview}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={styles.info}
                            placeholder="Họ và tên"
                        />
                        <AntDesign name="edit" size={24} color="black" />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
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
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text>Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrap: {
        flex: 1,
        alignItems: 'center',
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 10,
    },
    btn: {
        width: 100,
        height: 40,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
})
