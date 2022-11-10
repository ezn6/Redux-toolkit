# Redux toolkit 완전정복

![lama-redux](https://user-images.githubusercontent.com/68230951/201013639-d7e828a9-4bb7-445d-9498-b0c188f889fe.gif)

### 리덕스를 사용하는 이유

- 리덕스를 사용하지 않는다고 하면 root컴포넌트에서 자식의 자식 컴포넌트에 필요한 props을 넘겨주기 위해 자식 컴포넌트(1대)는 필요하지도 않지만 props을 받아 자신의 자식(2대)으로 넘겨야 한다. 만약 더 복잡하고 규모가 큰 앱이라면 몇단계를 거쳐야될 수도 있다. 단계를 거치면서 불필요한 리렌더링이 될수도 있다. → **하지만 리덕스를 사용하면 props drilling 막을수 있다!**
- createAsyncThunk는 비동기 작업을 처리하는 액션을 만들어준다. createAsyncThunk에서 try-catch 블록을 작성해주지 않아도 자동으로 해준다. (공식문서 : When your payloadCreator returns a rejected promise (such as a thrown error in an async function), the thunk will dispatch a rejected action containing an automatically-serialized version of the error as action.error.)

### Store

- 스토어는 컴포넌트의 상태를 관리하는 저장소다. 하나의 프로젝트는 하나의 스토어만 가질 수 있다.

### Action

- 스토어의 **상태를 변경하기 위해서는, 액션을 생성해야한다. 액션은 객체**이며, 반드시 type을 가져야 한다. 액션 객체는 액션생성함수에 의해서 만들어진다.

### Reducer

- 리듀서는 **현재 상태와 / 액션 객체를 받아** 새로운 상태를 리턴하는 함수다.

### Dispatch

- 디스패치는 스토어의 내장 함수 중 하나이며, 액션 객체를 넘겨줘 상태를 업데이트 시켜주는 역할을 한다

<br/>

<br/>

```
//express를 통해 간단한 서버를 만들어 통신하였다

app.post('/api/users/:id/update', (req, res) => {
  setTimeout(() => {
    res.send(req.body);
  }, 2000);
});
```

```
//예시 코드
//userSlice.js

import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
```

```
//사용할때

import { useDispatch } from 'react-redux';
import { updateUser2 } from '../../redux/userSlice';

const dispatch = useDispatch();
dispatch(updateUser2({ name, email }));
```



