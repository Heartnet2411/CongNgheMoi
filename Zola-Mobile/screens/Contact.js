import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,Dimensions,Image,ScrollView
} from 'react-native'
import React from 'react'
import { MaterialIcons, EvilIcons,AntDesign } from '@expo/vector-icons'

const Contact = () => {
    const listContact=[{
        id:1,
        name:'Nguyễn Văn A',
        avatar:require('../image/avatar.png')
    },
    {
        id:2,
        name:'Nguyễn Văn B',
        avatar:require('../image/avatar.png')
    },
    {
        id:3,
        name:'Nguyễn Văn C',
        avatar:require('../image/avatar.png')
    },
    {
        id:4,
        name:'Nguyễn Văn D',
        avatar:require('../image/avatar.png')
    },
    {
        id:5,
        name:'Nguyễn Văn E',
        avatar:require('../image/avatar.png')
    },
    {
        id:6,
        name:'Nguyễn Văn F',
        avatar:require('../image/avatar.png')
    
    }]
    return (
        <SafeAreaView>
            <View>
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
                    <TouchableOpacity style={styles.add}>
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
                <ScrollView>
                <View style={styles.list}>
                    {listContact.map((item) => {
                        return (
                            <View  key={item.id}>
                                <TouchableOpacity style={styles.contact}>
                                    <Image
                                        source={item.avatar}
                                        style={styles.avatar}
                                    />
                                
                                <Text style={styles.name}>{item.name}</Text>
                                <TouchableOpacity style={styles.message}>
                                <AntDesign  name="message1" size={24} color="black" />
                                </TouchableOpacity>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
                    <View/>
            </View>
        </SafeAreaView>
    )
}

export default Contact
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
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
  add :{
    marginLeft:60
  }
    ,
    option: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        height:30,
        backgroundColor:'#ECEBEB'

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
