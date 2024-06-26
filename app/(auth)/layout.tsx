import Logo from '@/components/ui/logo';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className='flex flex-col h-screen w-full items-center justify-center'>
      <Logo />
      {children} 
    </div>
  );
}

export default Layout;
