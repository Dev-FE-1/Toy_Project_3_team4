import { useState, useEffect } from 'react';

import { css, Theme } from '@emotion/react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

import { db, auth } from '@/api/firebaseApp';
import FitButton from '@/components/common/buttons/FitButton';

const ProfilePost = () => {
  const [user, setUser] = useState<DocumentData | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid);
        const docSnapshot = await getDoc(userDoc);
        if (docSnapshot.exists()) {
          setUser(docSnapshot.data());
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    console.log(isFollowing ? '언팔로우' : '팔로우');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div css={profileContainerStyle}>
        <div css={ProfileWrapStyle}>
          <div css={profileImageStyle}>
            <img src={user.photoURL} alt="Profile" />
          </div>
          <div css={profileInfoStyle}>
            <p css={usernameStyle}>{user.displayName}</p>
            <div css={followInfoStyle}>
              <div>
                <span css={followCountStyle}>12</span>
                <span css={followLabelStyle}>팔로잉</span>
              </div>
              <div>
                <span css={followCountStyle}>12</span>
                <span css={followLabelStyle}>팔로워</span>
              </div>
            </div>
          </div>
          <FitButton
            styleType={isFollowing ? 'secondary' : 'primary'}
            onClick={handleFollowToggle}
            // customStyle={followButtonStyle}
          >
            {isFollowing ? '팔로잉' : '팔로우'}
          </FitButton>
        </div>
        <div css={introduceStyle}>
          <p>고낙연의 오른팔 입니다.</p>
          <p>고낙연의 왼팔은 누구일까요?</p>
        </div>
      </div>
    </>
  );
};

const profileContainerStyle = css`
  padding: 20px 16px 22px 16px;
`;

const ProfileWrapStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const profileImageStyle = css`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const profileInfoStyle = css`
  flex: 1;
`;

const usernameStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  margin-bottom: 8px;
`;

const followInfoStyle = css`
  display: flex;
  gap: 20px;
  // margin-bottom: 8px;
`;

const followCountStyle = (theme: Theme) => css`
  font-weight: 700;
  font-size: ${theme.fontSizes.small};
  margin-right: 5px;
`;

const followLabelStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.small};
`;

const introduceStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.micro};
`;

export default ProfilePost;
