Vim�UnDo� }J� �~��=��V���>�U�є��Y[�   �       �                           c_�#   
 _�                            ����                                                                                                                                                                                                                                                                                                                                       �           V        c_�     �              �   Eimport { lazy, memo, useCallback, useEffect, useState } from 'react';   4import CardMenu from 'components/reusable/CardMenu';   ;import { useHistory, useLocation } from 'react-router-dom';   -import AuthContext from '@auth/context/auth';   :import PageContent from 'components/reusable/PageContent';   :import ProfileEdit from 'components/settings/ProfileEdit';   ,import 'assets/styles/pages/_settings.scss';   (import { useFlags } from 'libs/helpers';   @import { isPushNotificationSupported } from 'libs/notification';   2import { trackerDashboard } from 'libs/analytics';   *import * as backendApi from 'api/backend';   2import iconLock from 'assets/icons/icon-lock.svg';   4import iconNotif from 'assets/icons/icon-notif.svg';   0import Navbar from 'components/reusable/Navbar';   8import { MyPondsIcon } from 'components/reusable/icons';   *import useAccount from 'hooks/useAccount';   4import useLocalStorage from 'hooks/useLocalStorage';   import {     EFI_IS_FROM_ACCOUNT_PAGE,     EFI_IS_FROM_ACQUISITION_FORM   } from 'constants/storage';   Nimport { trackMyPondsEntryPointClicked } from '@my-ponds/libs/analytics/farm';       'const BottomSheetAttention = lazy(() =>   4  import('components/settings/BottomSheetAttention')   );       Oconst SettingsPage = memo(({ acquisitionName, summary, summaryIsLoading }) => {     const history = useHistory();   !  const location = useLocation();   M  const { isPasswordChange, isMyPondsEnabled, isUsingNewDashboardVersion2 } =       useFlags();     const ls = useLocalStorage();       *  const auth = AuthContext.useContainer();   )  let { trackLogout } = trackerDashboard;   >  const isSupportNotification = isPushNotificationSupported();       -  const [account, setAccount] = useState({});   F  const { highLight, isAlreadyFilledInTheData } = useAccount(account);         useEffect(() => {   "    if (!isMyPondsEnabled) return;   2    if (location.pathname !== '/settings') return;       /    if (ls.isExist(EFI_IS_FROM_ACCOUNT_PAGE)) {   *      ls.remove(EFI_IS_FROM_ACCOUNT_PAGE);       }       #    async function fetchSummary() {         try {   5        const Data = await backendApi.fetchSummary();           setAccount(Data.lead);         } catch (error) {           setAccount({});         }       }           fetchSummary();   0  }, [isMyPondsEnabled, location.pathname, ls]);       A  const [isAttentionShown, setAttentionStatus] = useState(false);          const menuClick = useCallback(       (route) => () => {         history.push(route);       },       [history]     );       "  function handleMyPondsButton() {   $    trackMyPondsEntryPointClicked();       $    if (!isAlreadyFilledInTheData) {         setAttentionStatus(true);         return;       }       +    let myPondsMenuUrl = '/my-ponds/farms';       3    if (ls.isExist(EFI_IS_FROM_ACQUISITION_FORM)) {   *      ls.set(EFI_IS_FROM_ACCOUNT_PAGE, 1);   "      myPondsMenuUrl += '/create';       }       !    history.push(myPondsMenuUrl);     }       *  const handleLogout = useCallback(() => {       trackLogout();       history.push('/');       auth.logout();   #  }, [auth, history, trackLogout]);       
  return (       <>         {isMyPondsEnabled && (           <BottomSheetAttention   %          isOpened={isAttentionShown}   3          onClose={() => setAttentionStatus(false)}   
        />         )}             <div className="page">   J        {!isUsingNewDashboardVersion2 && <Navbar pageName="Pengaturan" />}   *        <PageContent isCopyright fullView>             <ProfileEdit   -            acquisitionName={acquisitionName}   !            highLight={highLight}               summary={summary}             />                  {isMyPondsEnabled && (               <CardMenu   !              title="Tambak Saya"   +              onClick={handleMyPondsButton}   $              icon={<MyPondsIcon />}               />             )}                  {isPasswordChange && (               <CardMenu   #              title="Ubah Password"   >              onClick={menuClick('/settings/change-password')}   ;              icon={<img src={iconLock} alt="icon-lock" />}               />             )}       %          {isSupportNotification && (               <CardMenu                  title="Notifikasi"                 isNotification   1              summaryIsLoading={summaryIsLoading}                 summary={summary}   =              icon={<img src={iconNotif} alt="icon-notif" />}               />             )}       N          <CardMenu title="Logout" isLogout onClick={handleLogout} lastMenu />           </PageContent>         </div>       </>     );   });       export default SettingsPage;5�_�                            ����                                                                                                                                                                                                                                                                                                                                                  V        c_�     �                   5�_�                    �       ����                                                                                                                                                                                                                                                                                                                                                  V        c_�     �   �            5�_�                            ����                                                                                                                                                                                                                                                                                                                                                  V        c_�!     �          �      Fiimport { lazy, memo, useCallback, useEffect, useState } from 'react';5�_�                             ����                                                                                                                                                                                                                                                                                                                                                  V        c_�"   
 �   �               5�_�                     D        ����                                                                                                                                                                                                                                                                                                                            5          5          V       c_�T     �   C   E   �      i    [history]5��