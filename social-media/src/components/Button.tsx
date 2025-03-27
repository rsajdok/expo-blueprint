import { Alert } from "react-native";

type ButtonProps = {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    onChange?: (id: number) => void;
}

//export const ButtonR = ({ title }: { title: string }) => {
export const ButtonR = ({ title, onPress, disabled }: ButtonProps) => {
    // the same as:
    //export function ButtonR(): JSX.Element {
    const ava = 10;
    const MyComp = () => <h3>My Component</h3>;
    return (
        <button onClick={onPress}>Button
            <MyComp />
            {ava}
            {title}
        </button>
    )
}