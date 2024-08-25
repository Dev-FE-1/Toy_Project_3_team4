import { useState } from 'react';

import FitButton from '@/components/common/buttons/FitButton';
import FullButton from '@/components/common/buttons/FullButton';

import Toast from './components/common/Toast';

function App() {
  const [count, setCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank"></a>
      </div>
      <h1>토이프로젝트3 4조</h1>
      <FitButton children="팔로우" onClick={() => alert('Hello, world!')} styleType="primary" />
      <FitButton children="팔로잉" onClick={() => alert('Hello, world!')} styleType="secondary" />
      <div
        style={{
          margin: 'auto',
          width: '375px',
          height: '812px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid black',
        }}
      >
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
        <Toast message="토스트 컴포넌트~" isActive={showToast} onClose={handleCloseToast} />
        <FitButton styleType="primary" onClick={handleShowToast}>
          클릭해보쇼
        </FitButton>
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
