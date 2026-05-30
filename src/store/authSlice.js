import { createSlice } from "@reduxjs/toolkit";

// initialState redux state ki starting/default value hoti hai

const initialState={

    // status batayega user login hai ya nahi
    // false matlab abhi authenticated nahi hai

    status:false,

    // userData me logged in user ki information store hogi
    // initially null kyuki abhi koi user nahi hai

    userData:null
}

// createSlice redux ka slice/reducer create karta hai
// isse actions aur reducer automatically ban jaate hain

const authSlice=createSlice({

    // slice ka naam
    // redux devtools me isi naam se dikhega

    name:"auth",

    // default state pass kar rahe hain
    initialState,

    reducers:{

        // yaha saare actions/functions aayenge
        // jaise login, logout etc

        login:(state,action)=>{
                state.status=true;
                const user = action.payload.userData;
                state.userData = {
                    $id: user.$id,
                    name: user.name,
                    email: user.email,
                };
        },
        logout:(state)=>{
                state.status=false;
                state.userData=null;
        }

    }
})

export const {login,logout} =authSlice.actions

// reducer export kar rahe hain taaki store me add kar sake

export default authSlice.reducer