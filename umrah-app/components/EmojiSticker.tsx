import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Image, type ImageSource } from 'expo-image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


type Props = {
  imageSize: number;
  stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const drag = Gesture.Pan().onChange(event => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
            {
                translateX: translateX.value,
            },
            {
                translateY: translateY.value,
            },
            ],
        };
    });

    
    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350 }]}>
                <Animated.Image
                    source={stickerSource}
                    resizeMode="contain"
                    style={{ width: imageSize, height: imageSize }}
                />
            </Animated.View>
        </GestureDetector>
    );
}
