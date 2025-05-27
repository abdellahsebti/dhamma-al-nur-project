import { RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';
import Videos from '@/pages/Videos';
import Podcasts from '@/pages/Podcasts';
import AlQawlAlMufid from '@/pages/AlQawlAlMufid';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Join from '@/pages/Join';
import NotFound from '@/pages/NotFound';
import CoffeeEyes from '@/pages/CoffeeEyes';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import Layout from '@/components/layout/Layout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'videos',
        element: <Videos />,
      },
      {
        path: 'podcasts',
        element: <Podcasts />,
      },
      {
        path: 'al-qawl-al-mufid',
        element: <AlQawlAlMufid />,
      },
      {
        path: 'coffee-eyes',
        element: <CoffeeEyes />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'join',
        element: <Join />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: 'terms-and-conditions',
        element: <TermsAndConditions />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]; 