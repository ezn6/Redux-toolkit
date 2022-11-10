import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//createAsyncThunk 에서 try-catch 블록을 작성해주지 않아도 에러핸들링 알아서해준다. 오류처리에 관해서 원하는 추가적인 작업을 해줄수도 있다.

export const updateUser2 = createAsyncThunk('user/update', async (user) => {
  const res = await axios.post(
    'http://localhost:8800/api/users/1/update',
    user
  );
  return res.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      name: 'Peter',
      email: 'Peter@gmail.com',
    },
    pending: null,
    error: null,
  },
  extraReducers: {
    [updateUser2.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [updateUser2.fulfilled]: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    [updateUser2.rejected]: (state) => {
      state.pending = null;
      state.error = true;
    },
  },
});

export default userSlice.reducer;
