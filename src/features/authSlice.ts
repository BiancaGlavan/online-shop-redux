import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface IUser {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar?: string;
}

export interface AuthState {
  isAuth: boolean;
  token: string;
  user: IUser | null;
}

const initialState: AuthState = {
    isAuth: false,
    token: '',
    user: null,
};



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {

      state.isAuth = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
        state.isAuth = false;
        state.token = '';
        state.user = null;
    },
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
    }
  },


});

export const { setAuth, setToken, setUser, logout, login } = authSlice.actions;

export default authSlice.reducer;
