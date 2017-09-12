import React, { Component } from 'react';
import { ScrollView, View, Text, Linking, Platform } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255, 1)"
      />
    ),
    tabBarIcon: ({ tintColor }) => {
      return (
        <Icon
          name="favorite"
          size={30}
          color={tintColor}
        />);
    }
  });

  renderLikedJobs() {
    const { detailWrapperStyle, italics } = styles;
    
    return this.props.likedJobs.map(job => {
      const {
        jobkey, company,formattedRelativeTime,
        url, longitude, latitude, jobtitle
      } = job;
      const initialRegion = {
        longitude: longitude,
        latitude: latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      }

      return (
        <Card
          key={jobkey}
          title={jobtitle} 
        >
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={ Platform.OS === 'android' }
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={detailWrapperStyle}>
              <Text style={italics}>{company}</Text>
              <Text style={italics}>{formattedRelativeTime}</Text>
            </View>
          </View>
          <Button
            title="Apply Now!"
            backgroundColor="#03A9F4"
            onPress={() => Linking.openURL(url)}
          />
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

const styles = {
  detailWrapperStyle: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
}

export default connect(mapStateToProps)(ReviewScreen);
