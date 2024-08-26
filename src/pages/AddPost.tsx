import CloseTitleShareHeader from '@/components/layout/header/CloseTitleShareHeader';

const AddPostPage = () => {
  return (
    <>
      <CloseTitleShareHeader
        onCloseClick={console.log}
        title="새 포스트"
        onShareClick={console.log}
      />
      <div>AddPostPage</div>
    </>
  );
};

export default AddPostPage;
