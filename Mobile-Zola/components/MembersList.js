import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import MemberInfo from './MemberInfo'
import MemberKey from './MemberKey'

const MembersList = ({ navigation, route }) => {
    const conversation = route.params.conversation
    const [active1, setActive1] = useState(true)
    const [active2, setActive2] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        setActive1(true)
                        setActive2(false)
                    }}
                    style={{ flex: 1 }}
                >
                    <Text style={active1 ? styles.textActive : styles.text}>
                        Thành viên
                    </Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity
                    onPress={() => {
                        setActive1(false)
                        setActive2(true)
                    }}
                    style={{ flex: 1 }}
                >
                    <Text style={active2 ? styles.textActive : styles.text}>
                        Trưởng/Phó nhóm
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.list}>
                {active1
                    ? // List of members
                      conversation.members.map((member) => {
                          if (
                              member === conversation.groupLeader ||
                              conversation.deputyLeader.includes(member)
                          ) {
                              return (
                                  <MemberKey key={member._id} member={member} />
                              )
                          } else {
                              return (
                                  <MemberInfo
                                      key={member._id}
                                      member={member}
                                  />
                              )
                          }
                      })
                    : // List of leaders
                      [
                          conversation.groupLeader,
                          ...conversation.deputyLeader,
                      ].map((leader) => {
                          return <MemberKey key={leader._id} member={leader} />
                      })}
            </ScrollView>
        </View>
    )
}

export default MembersList

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,

        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    textActive: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: 'blue',
    },
    list: {
        marginTop: 10,
        backgroundColor: 'white',
    },
})
