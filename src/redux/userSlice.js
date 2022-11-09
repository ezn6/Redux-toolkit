import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'John',
    email: 'John@gmail.com',
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

export const { update } = userSlice.actions; // Update페이지에서 값을 수정할때 사용할수 있는 acion을 export 하는것이다.
export default userSlice.reducer; //store에 적어주기 위한 reducer의 export
