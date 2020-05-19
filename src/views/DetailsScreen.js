import React from 'react';
import { Text, View, StyleSheet,SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

export default class DetailsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerVisible: () => false,
            headerTitle: () => <Text>{navigation.getParam('product_name', 'valeur manquante')}</Text>,
            headerRight: () => (
                <TouchableOpacity
                onPress={() => alert('This is a button!')}
                style={{marginRight:15}}
                >
                    <Icon
                        name="heart"
                        type="EvilIcons"
                    />
                </TouchableOpacity>
            ),
        };
      };


    render() {

          return(
            <SafeAreaView style={{flex: 1, paddingTop:20, alignSelf: 'center'}}>
                <Text>{this.props.route.params.product_name}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FullImage', { imageSource: this.props.route.params.item.image_url })}
                    >
                    <Image
                        source={{uri: this.props.route.params.item.image_small_url }}
                        style={{ width: 200, height: 200, borderRadius: 100 }}
                    />
                    <Text>Kcal : {this.props.route.params.item.nutriments["energy-kcal"]}</Text>
                    <Text>Nutriscore : {this.props.route.params.item["nutriscore_grade"]}</Text>
                    <Text>Description du produit : {this.props.route.params.item["ingredients_text"]}</Text>
                    <Text>Nombres d'ingrédients : {this.props.route.params.item["ingredients_n"]}</Text>
                 </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    lineContainer: {
    height: 40,
    padding: 10,

    },
});
