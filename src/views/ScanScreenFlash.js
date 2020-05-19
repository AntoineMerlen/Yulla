import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default class ScanScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isFlashOn: false,
            flashState: Camera.Constants.FlashMode.off,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            scanned: null
        }
    }

    async componentDidMount() {
        //Getting Permission result from app details.
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    changeFlash(){
        this.state.isFlashOn ?
            this.setState({isFlashOn:false, flashState: Camera.Constants.FlashMode.off}) :
            this.setState({isFlashOn:true, flashState: Camera.Constants.FlashMode.torch})
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({scanned: true})
        this.props.navigation.navigate('productInfo', { data: data })
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};


    render(){
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return (
            <View>
                <Text>No access to camera</Text>
            </View>
            );
        } else {
            return (
            <View style={{ flex: 1 }}>
              <Camera
                    type={this.state.type}
                    flashMode={Camera.Constants.FlashMode.torch}
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }}

                    >

                    <Button title={'Flash'} onPress={()=> this.changeFlash()} />
                    <Button title={'Recommencer'} onPress={()=> this.setState({scanned: null})} />

              </Camera>
            </View>
          );
        }
    }


}
