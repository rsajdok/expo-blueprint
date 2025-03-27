import { Button, Text, TextInput, View } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { useForm, SubmitHandler, Controller, Form, FormProvider } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomTextInput from '@/components/CustomTextInput';
import { neon } from "@neondatabase/serverless";
import { useEffect } from 'react';

const sql = neon("postgresql://neondb_owner:npg_1PBq0WxitDCs@ep-shrill-brook-a2etg7pr-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require");

const PersonalInfoSchema = z.object({
    name: z.string({ message: 'Name is required' })
        .min(3, { message: 'Name must be longer than 2' }),
});

type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export default function App() {
    const { signIn } = useAuth();

    // test the database connection by fetching the db version
    useEffect(() => {
        const fetchVersion = async () => {
            const result = await sql`SELECT version()`;
            console.log(result);
        }
        fetchVersion();
    }, []);

    const form = useForm<PersonalInfo>({
        resolver: zodResolver(PersonalInfoSchema),
    });
    console.log('Errors: ', form.formState.errors);

    const onNext: SubmitHandler<PersonalInfo> = (data) => {
        console.log(data);

        signIn(data.name);
    };

    return (
        <View className='flex-1 justify-center items-center'>
            <FormProvider {...form}>
                <Text className='text-2xl mb-5 text-cyan-900'>Sign in</Text>
                <CustomTextInput
                    className='w-4/5 h-10 border border-gray-300 rounded px-2.5 mb-4'
                    name="name"
                    label="Full name"
                    placeholder="Joe do"
                />
                <Button title='Sign in' onPress={form.handleSubmit(onNext)} />
            </FormProvider>
        </View>
    );
}
