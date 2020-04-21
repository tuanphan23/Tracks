import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus, withNavigation } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { Entypo } from '@expo/vector-icons';

const TrackCreateScreen = ({ isFocused }) => {
    const { state: { recording }, addLocation } = useContext(LocationContext);
    const callback = useCallback(location => {
        addLocation(location, recording);
    }, [recording])
    const [err] = useLocation(isFocused || recording, callback);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </SafeAreaView>
    )
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <Entypo name="add-to-list" size={20} />,
};

const styles = StyleSheet.create({

});

export default withNavigationFocus(TrackCreateScreen);