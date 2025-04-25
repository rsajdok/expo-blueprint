import { View } from 'react-native';

type ProgressBarProps = {
  progress: number; // 0 - 1
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View
      style={{
        backgroundColor: '#eee',
        width: '100%',
        height: 10,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: `${progress * 100}%`,
          height: '100%',
          backgroundColor: '#6B4FFE',
          borderRadius: 10,
        }}
      />
    </View>
  );
}
