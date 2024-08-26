import { useState } from 'react';

import Modal from '@/components/common/Modal/Dialog';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        height="50%" // 높이를 조절할 수 있습니다
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button onClick={() => {}}>Confirm</button>
          </>
        }
        animated={false}
      >
        <p>This is the content of the modal.</p>
        <p>You can add any React components here.</p>
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      HomePage
    </div>
  );
};

export default HomePage;
