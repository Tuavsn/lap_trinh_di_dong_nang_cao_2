import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Image, Switch } from "react-native"
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components";
import { Lock, Sms } from "iconsax-react-native";
import { appColors } from "../../constants/appColors";
import { Validate } from "../../utils/validate";

const LoginScreen = ({navigation}: any) => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [isRemember, setIsRemember] = useState(true);

    const [isDisable, setIsDisable] = useState(true);

    useEffect(() => {
        const emailValidation = Validate.email(email)

        if( !email || !password || !emailValidation) {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [email, password])

    const login = async () => {
        await AsyncStorage.setItem('accessToken', 'Tuan')
        console.log('Login succeed')
    }

    return (
        <ContainerComponent isImageBackgournd isScroll>
            <SectionComponent
                styles={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 75
                }}
            >
                <Image
                    source={require('../../assets/images/text-logo.png')}
                    style={{
                        width: 162,
                        height: 114,
                        marginBottom: 30
                    }}
                />
            </SectionComponent>
            <SectionComponent>
                <TextComponent size={24} title text="Sign in" />
                <SpaceComponent height={21} />
                <InputComponent
                    value={email}
                    placeHolder="Email"
                    onChange={val => setEmail(val)}
                    allowClear
                    affix={<Sms size={22} color={appColors.gray} />}
                />
                <InputComponent
                    value={password}
                    placeHolder="Password"
                    onChange={val => setPassword(val)}
                    isPassword
                    allowClear
                    affix={<Lock size={22} color={appColors.gray} />}
                />
                <RowComponent
                    justify="space-between"
                >
                    <RowComponent onPress={() => setIsRemember(!isRemember)} >
                        <Switch
                            trackColor={{true: appColors.primary}}
                            thumbColor={appColors.white}
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)}
                        />
                        <SpaceComponent width={4} />
                        <TextComponent text="Remember me" />
                    </RowComponent>
                    <ButtonComponent
                        text="Forgot Password?"
                        onPress={() => navigation.navigate('ForgotPassword')}
                        type="text"
                    />
                </RowComponent>
            </SectionComponent>
            <SpaceComponent height={16} />
            <SectionComponent>
                <ButtonComponent
                    disable={isDisable}
                    text="SIGN IN"
                    type="primary"
                />
            </SectionComponent>
            <SectionComponent>
                <RowComponent
                    justify="center"
                >
                    <TextComponent text="Don't have an account? " />
                    <ButtonComponent
                        type="link"
                        text="Sign up"
                        onPress={() => navigation.navigate('SignUpScreen')}
                    />
                </RowComponent>
            </SectionComponent>
        </ContainerComponent>
    )
}

export default LoginScreen;