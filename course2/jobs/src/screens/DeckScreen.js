import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import { likeJob } from '../actions';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => {
      return (
        <Icon
          name="description"
          size={30}
          color={tintColor}
        />);
    }
  }

  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    }
    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={ Platform.OS === 'android' }
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapperStyle}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g,'').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No more jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundCOlor="#03A9F4"
          onPress={ () => this.props.navigation.navigate('map') }
        />
      </Card>
    );
  }

  onSwipeRight = (job) => {
    this.props.likeJob(job)
  }

  render() {
    return (
      <View>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={this.onSwipeRight}
          keyProp="jobkey"
        />
      </View>
    );
  }
}

function mapStateToProps ({ jobs }) {
  return { jobs: jobs.results };
}

const styles = {
  detailWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

export default connect(mapStateToProps, { likeJob })(DeckScreen);
