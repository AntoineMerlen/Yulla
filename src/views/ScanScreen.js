import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';


export default function ScanScreen() {



	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [scanned, setScanned] = useState(false);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	useEffect(() => {
		(async () => {
		const { status } = await Camera.requestPermissionsAsync();
		setHasPermission(status === 'granted');
		})();
	}, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{
			flex: 1,
        	flexDirection: 'column',
        	justifyContent: 'flex-end'
		}}
        type={type}
		onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >

			{scanned && (
				<Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
			)}

      </Camera>
    </View>
  );
}
