import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView,
} from 'react-native'
import React from 'react'
import { Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter'
import Tab from '../components/Tab'
import { EvilIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const Message = ({ navigation, route }) => {
    const listMess = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 2,
            name: 'Nguyễn Văn B',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 3,
            name: 'Nguyễn Văn C',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 4,
            name: 'Nguyễn Văn D',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 5,
            name: 'Nguyễn Văn E',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 6,
            name: 'Nguyễn Văn F',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 7,
            name: 'Nguyễn Văn G',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 8,
            name: 'Nguyễn Văn H',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 9,
            name: 'Nguyễn Văn I',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 10,
            name: 'Nguyễn Văn K',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 11,
            name: 'Nguyễn Văn L',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 12,
            name: 'Nguyễn Văn M',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
        {
            id: 13,
            name: 'Nguyễn Văn N',
            avatar: require('../image/avatar.png'),
            time: '10:00',
            content: 'Chào bạn',
        },
    ]
    useFonts({ Inter_600SemiBold })
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity style={styles.search}>
                    <EvilIcons
                        name="search"
                        style={styles.iconSearch}
                        size={30}
                        color="white"
                    />
                    <Text style={styles.txtSearch}>Tìm kiếm</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        style={styles.iconQR}
                        name="qrcode-scan"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons
                        name="add"
                        style={styles.iconAdd}
                        size={35}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            {/* List message */}
            <ScrollView style={styles.list}>
                {listMess.map((item) => {
                    return (
                        <TouchableOpacity id={item.id}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    borderBottomColor: '#ccc',
                                    borderBottomWidth: 1,
                                    backgroundColor: '#fff',
                                    paddingHorizontal: 15,
                                    paddingVertical: 5,
                                }}
                            >
                                <Image
                                    source={item.avatar}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30,
                                    }}
                                />
                                <View
                                    style={{
                                        marginLeft: 10,
                                        width: 250,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'Inter_600SemiBold',
                                            fontSize: 18,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Inter_600SemiBold',
                                            fontSize: 14,
                                            color: '#8F9BB3',
                                            marginLeft: 10,
                                        }}
                                    >
                                        {item.content}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        fontFamily: 'Inter_600SemiBold',
                                        fontSize: 14,
                                        color: '#8F9BB3',
                                    }}
                                >
                                    {item.time}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <Tab />
        </SafeAreaView>
    )
}

export default Message

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: windowHeight * 0.8,
        width: windowWidth,
    },
    header: {
        height: 60,
        backgroundColor: '#1B96CB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth * 0.75,
    },
    iconSearch: {
        marginLeft: 10,
    },
    txtSearch: {
        marginLeft: 15,
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
    },
    iconQR: {
        width: 28,
        height: 28,
        marginLeft: windowWidth * 0.01,
    },
    iconAdd: {
        width: 40,
        height: 40,
        marginLeft: windowWidth * 0.03,
    },
    list: {
        height: Math.round(windowHeight) - windowHeight * 0.16,
        width: windowWidth,
    },
})
