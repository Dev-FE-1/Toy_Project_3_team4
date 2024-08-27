import { useState } from 'react';

import Modal from '@/components/common/Modal/Modal';

const SampleModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title={'모달 타이틀'}
        animated={true}
        fullScreen={false}
        onClose={() => setIsModalOpen(false)}
      >
        <h1>this is 헤딩</h1>
        <p>모달 컨텐츠1 !</p>
        <p>모달 컨텐츠2 !</p>
        <div>hi, hello, hallo</div>
        <button className="닫기버튼" onClick={() => setIsModalOpen(false)}>
          close
        </button>
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>모달</button>
    </>
  );
};

export default SampleModal;
