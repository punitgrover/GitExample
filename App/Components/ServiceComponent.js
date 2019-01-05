import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Image, ActivityIndicator } from 'react-native';
import menu from '../Images/menu.png';
import  notification from '../Images/notification.png';
import logo from '../Images/logo.png';
import star from '../Images/star.png';

import SearchBar from 'react-native-search-bar';

export default class ServiceComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data:[],
            search:'',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    componentDidMount() {
        this.props.callService()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != null) {
            console.log('the state', nextProps)
            this.setState({
                data:nextProps.data,
                dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
            });
        }

        if (nextProps.error != undefined) {
            Alert.alert(
                'Error',
                nextProps.error,
                [
                    { text: 'Do you want to reload', onPress: () => this.props.callService() },
                ],
                { cancelable: false })
        }
    }
     reseach()
    {
        debugger;
        const filteredArr=this.state.data.filter(a => a.full_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(filteredArr)
        });
    }
    renderCell = (rowData) => (
        <View style={styles.containerList}>
            <Image sstyle={styles.photo} />
           
            <View style={{flex:1,margin:5}}>
         


<Text style={{ color:'#1e90ff',fontSize: 16 }} >{rowData.full_name}</Text>



<Text style={{ fontSize: 16 ,marginTop:10,fontWeight: 'bold'}} >{rowData.description}</Text>
<View style={{flex:1,flexDirection:'row',marginTop:10}}>

<Image style={{ width: 20,height: 20,backgroundColor:'white',resizeMode: 'stretch' }} source={star} />

<Text style={{ fontSize: 16,marginLeft:10 }} >{rowData.stargazers_count}</Text>
<View style={{ width: 20,height: 20,marginLeft:10 ,backgroundColor:'yellow',borderRadius:100}}/>

<Text style={{ fontSize: 16,marginLeft:10 }} >{rowData.language}</Text>
</View>
</View>

        </View>
    );

    render() {
        const { dataSource, isLoading } = this.state;

        return (
            <View style={styles.container}>
            <View style={{backgroundColor:'black',width:'100%',height:140}}>
            <SearchBar
            ref={ref => (this.search1 = ref)}
            barStyle="default"
            onChangeText={search => this.setState({ search })}

            onSearchButtonPress={() => this.reseach()}
          />
            <View style={{flex:1,height:20,padding:10,marginTop:10,flexDirection:'row'}}>
         
<View style={{flex: 1,alignItems: 'flex-start'}}>


<Image style={{ width: 30,height: 30,resizeMode: 'stretch' }} source={menu} />
</View>
<View style={{flex: 1,alignItems: 'center'}}>


<Image style={{ width: 30,height: 30,backgroundColor:'white',resizeMode: 'stretch' }} source={logo} />
</View>
<View style={{flex: 1,alignItems: 'flex-end'}}>


<Image style={{ width: 30,height: 30,resizeMode: 'stretch' }} source={notification} />
</View>

            </View>
            <View style={{flex:1,height:10,flexDirection:'row',margin:20}}>
         
<View style={{flex: 1,alignItems: 'flex-start'}}>


<Text style={{ color:'white',fontSize: 16 }} >Overview</Text>
</View>
<View style={{flex: 1,alignItems: 'center'}}>


<Text style={{ color:'white',fontSize: 16 ,fontWeight: 'bold'}} >Repostiories</Text>
</View>
<View style={{flex: 1,alignItems: 'flex-end'}}>


<Text style={{ color:'white',fontSize: 16 }} >Stars</Text>
</View>

            </View>
            </View>
                <ListView
                    style={{ marginTop: 30, flex: 1 }}
                    dataSource={dataSource}
                    renderRow={(rowData) => this.renderCell(rowData)}
                />
                <ActivityIndicator
                    animating={this.props.isLoading}
                    style={[styles.centering, { height: 80 }]}
                    size="large"
                    color="#0000ff"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    containerList: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 10,
        width: 10,
        resizeMode:'stretch'
    },

    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,

    },
});
