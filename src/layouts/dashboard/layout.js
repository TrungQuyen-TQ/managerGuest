import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';

const SIDE_NAV_WIDTH = 270;

const LayoutRoot = styled('div')(({ theme, props }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')] : {
    paddingLeft: props ? SIDE_NAV_WIDTH : 54
}
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const Layout = withAuthGuard((props) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const [openNavV2, setOpenNavV2] = useState(true);

  const handleDrawerOpen = () => {
    setOpenNavV2(true);
  };

  const handleDrawerClose = () => {
    setOpenNavV2(false);
  };

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  const handlePathnameChangeV2 = useCallback(
    () => {
      if (openNavV2) {
        setOpenNavV2(true);
      }
    },
    [openNavV2]
  );

  useEffect(
    () => {
      handlePathnameChange();
      handlePathnameChangeV2();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)}
        open={openNavV2}
        setOpen={handleDrawerOpen}
        setClose={handleDrawerClose}
      />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
        openV2={openNavV2}
        setClose={handleDrawerClose}
      />
      <LayoutRoot
        props={openNavV2}
      >
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
});