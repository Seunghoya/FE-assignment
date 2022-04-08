export function createHooks(callback) {
  let states = [], idx = 0;
  function useState(initialState){
    // const [state, setState] = useState(initialState)
    
    // state에는 initialState가 담겨야 한다.
    let state = states[idx] === undefined ? initialState : states[idx];
    let currentIdx = idx;
    
    // setState(newState)를 실행하면 state는 newState로 대체되어야 한다.
    let setState = (newState) => {
      // 만약 state값이 이전과 동일하면 재실행 되지 않는다.
      if (state === newState) return;

        states[currentIdx] = newState;
        callback();
    }

    idx += 1;
    return [state, setState];
  }

  function resetContext(){
    // resetContext를 실행해줘야 값이 정상적으로 반영된다

    // useState 함수가 호출 될 때마다 index가 늘어나는걸 초기화 해줘야 한다.
    // 이 과정이 없으면 여러 setState 함수가 있을 때, 올바르게 동작하지 않는다.
    
    // idx값을 0으로 초기화 해준다.
    idx = 0;
  }

  return { useState, resetContext };

}
