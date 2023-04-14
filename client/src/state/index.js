import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  graph:null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setGraph:(state, action)=>{
      state.graph = action.payload.graph;
    }
  },
});

export const {setLogin, setLogout,setGraph } =
  authSlice.actions;
export default authSlice.reducer;