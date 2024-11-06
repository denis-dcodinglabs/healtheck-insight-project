import React from 'react';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <DashboardLayout />
    </>
  );
}

export default App;