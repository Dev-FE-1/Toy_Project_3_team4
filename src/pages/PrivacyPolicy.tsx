import { useNavigate } from 'react-router-dom';

import BackHeader from '@/components/layout/header/BackHeader';
import { legalPageStyle } from '@/styles/legal';

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div css={legalPageStyle}>
      <BackHeader title="" onBackClick={handleBackClick} />
      <h1>개인정보처리방침</h1>
      <p>
        본 서비스는 구글 로그인을 통해 사용자의 이름, email 주소, 프로필 이미지를 수집하며, 수집된
        개인정보는 다음과 같은 목적으로 사용됩니다. 본 방침은 개인정보 보호법을 준수합니다.
      </p>
      <h2>1. 수집하는 개인정보 항목</h2>
      <p>구글 로그인: 이름, email 주소, 프로필 이미지</p>
      <h2>2. 개인정보의 수집 및 이용 목적</h2>
      <ul>
        <li>서비스 제공 및 사용자 식별</li>
        <li>게시글 작성 및 서비스 내 소셜 활동</li>
        <li>사용자 맞춤형 서비스 제공</li>
        <li>서비스 개선 및 신규 서비스 개발</li>
      </ul>
      <h2>3. 개인정보 보유 및 이용 기간</h2>
      <p>
        사용자가 서비스 이용을 종료하거나 회원 탈퇴 시, 해당 정보는 즉시 파기됩니다. 단, 관련 법령에
        따라 일정 기간 보관이 필요한 정보는 해당 법령에 의거하여 보관됩니다. 이용자의 동의를 받아
        보유하고 있는 개인정보는 동의를 받은 기간 동안 보유 및 이용됩니다.
      </p>
      <h2>4. 개인정보 제3자 제공</h2>
      <p>
        서비스는 사용자의 동의 없이는 개인정보를 외부에 제공하지 않습니다. 다만, 관계 법령에 의한
        수사기관의 요구 등 법률에 따른 제공 요청이 있는 경우에는 요청에 응할 수 있습니다.
      </p>
      <h2>5. 개인정보의 보호</h2>
      <p>
        서비스는 사용자의 개인정보를 안전하게 보호하기 위해 기술적, 관리적 조치를 취하고 있습니다.
        모든 데이터는 암호화되어 저장 및 관리되며, 중요한 데이터는 별도의 보안 기능을 통해
        보호됩니다.
      </p>
      <h2>6. 사용자의 권리</h2>
      <p>
        사용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 동의 철회를 통해 개인정보
        이용을 중단할 수 있습니다. 개인정보 처리에 대한 동의 철회, 열람, 수정 등의 요청은 서비스 내
        설정 메뉴나 고객센터를 통해 가능합니다.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
