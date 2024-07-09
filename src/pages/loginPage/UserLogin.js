import React from "react";
import { useForm } from "react-hook-form";
import Header from "../../layouts/header/Header";

function UserLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);
    return (
        <>
            <Header></Header>
            <div className="w-[210px] mx-auto h-[152px] mb-8">
                <img src="/assets/logoWhite.png" className="w-full" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Email"
                    {...register("Email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                    })}
                    className="border-b w-full p-4 mb-8"
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register("Password", {})}
                    className="border-b w-full p-4"
                />

                <input type="submit" />
            </form>
        </>
    );
}

export default UserLogin;
