import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
} from 'react-native'
import React, { useEffect,useContext,useState } from 'react'
import { MaterialIcons, EvilIcons, AntDesign ,FontAwesome5} from '@expo/vector-icons'
import Tab from '../components/Tab'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {jwtDecode} from "jwt-decode";

const Contact = ({navigation}) => {
    const listContact = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            avatar: require('../image/avatar.png'),
        },
        {
            id: 2,
            name: 'Nguyễn Văn B',
            avatar: require('../image/avatar.png'),
        },
        {
            id: 3,
            name: 'Nguyễn Văn C',
            avatar: require('../image/avatar.png'),
        },
        {
            id: 4,
            name: 'Nguyễn Văn D',
            avatar: require('../image/avatar.png'),
        },
        {
            id: 5,
            name: 'Nguyễn Văn E',
            avatar: require('../image/avatar.png'),
        },
        {
            id: 6,
            name: 'Nguyễn Văn F',
            avatar: require('../image/avatar.png'),
        },
    ]
    const {accountId,setAccountId} = useContext(UserType)
    const [users,setUsers]=useState([])
    useEffect(() => {
        const fetchUser= async()=>{
            const token=await AsyncStorage.getItem('AuthToken')
            const decodedToken=jwtDecode(token);
            const accountId=decodedToken.accountId;
            setAccountId(accountId)

            axios.get(`http://localhost:3000/user/findAllExceptCurrentUser?account_id=${accountId}`).then((res)=>{
                setUsers(res.data)
                }).catch((err)=>{
                    console.log(err)
                });
        };
        fetchUser();
    }
    , [])
    console.log('users',users,'accountid',accountId)
    return (
        <SafeAreaView style={styles.container}>
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
                    <TouchableOpacity style={styles.add} onPress={()=>{navigation.navigate('AddFriend')}}>
                        <MaterialIcons
                            name="person-add-alt-1"
                            size={30}
                            color="white"
                            style={styles.iconAdd}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.option}>
                    <TouchableOpacity>
                        <Text style={styles.txtOption}>Bạn bè</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.txtOption}>Nhóm</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.FriendRequests}>
                    <TouchableOpacity style={styles.btnRequest}>
                    <FontAwesome5 name="user-friends" size={24} color="#1B96CB"/>
                        <Text style={styles.txtRequest}>Lời mời kết bạn</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.list}>
                        {users.map((item) => {
                            return (
                                <View key={item.id}>
                                    <TouchableOpacity style={styles.contact}>
                                        <Image
                                            source={item.avatar}
                                            style={styles.avatar}
                                        />

                                        <Text style={styles.name}>
                                            {item.firstName}
                                        </Text>
                                        <TouchableOpacity
                                            style={styles.message}
                                        >
                                            <AntDesign
                                                name="message1"
                                                size={24}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
                
                <View />
                <Tab />
        </SafeAreaView>
    )
}

export default Contact
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
        width: windowWidth,
        height: 60,
        backgroundColor: '#1B96CB',
        flexDirection: 'row',
        alignItems: 'center',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 280,
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
    iconAdd: {
        width: 28,
        height: 28,
    },
    add: {
        marginLeft: 60,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#ECEBEB',
    },
    FriendRequests:{
        backgroundColor:'#ECEBEB',
        height:50,
        flexDirection:'row',
    },
    btnRequest:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:20,
    },
    txtRequest:{
        marginLeft:20,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: 'black',
    },
    txtOption: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: 'black',
    },
    list: {
        height: Math.round(windowHeight) - 60,
    },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        marginLeft: 30,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    message: {
        position: 'absolute',
        right: 20,
    },
})
