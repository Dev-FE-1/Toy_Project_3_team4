import { useState } from 'react';

import Modal from '@/components/common/Modal/Modal';

const SampleModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <>
            <h2>Modal Title</h2>
            <p>모달 타이틀</p>
          </>
        }
        height="50%"
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button onClick={() => {}}>Confirm</button>
          </>
        }
        animated={true}
      >
        <h1>this is 헤딩</h1>
        <p>모달 컨텐츠1 !</p>
        <p>모달 컨텐츠2 !</p>
        <div>hi hello, hall</div>
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>모달</button>
    </>
  );
};

export default SampleModal;
