import { useState } from 'react';
import FitButton from '@/components/common/buttons/FitButton';
import FullButton from '@/components/common/buttons/FullButton';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank"></a>
      </div>
      <h1>토이프로젝트3 4조</h1>
      <FitButton children="팔로우" onClick={() => alert('Hello, world!')} styleType="primary" />
      <FitButton children="팔로잉" onClick={() => alert('Hello, world!')} styleType="secondary" />
      <div style={{ width: '300px' }}>
        <FullButton
          children="추가하기"
          onClick={() => alert('Hello, world!')}
          styleType="disabled"
        />
        <FullButton
          children="추가하기"
          onClick={() => alert('Hello, world!')}
          styleType="primary"
        />
        <FullButton
          children="구글로 계속하기"
          onClick={() => alert('Hello, world!')}
          styleType="signin"
        />
        <FullButton children="취소하기" onClick={() => alert('Hello, world!')} styleType="cancel" />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );

  
}

export default App;
