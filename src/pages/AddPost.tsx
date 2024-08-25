import Header from '@/components/layout/header/Header';

const AddPostPage = () => {
  return (
    <>
      <Header
        showCloseButton
        onCloseClick={() => console.log('Close')}
        title="동영상 링크"
        showCompleteButton
        onCompleteClick={() => console.log('완료')}
      />
      <div>AddPostPage</div>
    </>
  );
};

export default AddPostPage;
