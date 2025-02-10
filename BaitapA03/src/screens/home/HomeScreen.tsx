import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button, Text, View } from "react-native"

const HomeScreen = () => {

    const logout = async () => {
        await AsyncStorage.clear();
        console.log('Logout succeed')
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home Screen</Text>
            <Button
                title="Logout"
                onPress={logout}
            />
        </View>
    )
}

export default HomeScreen;