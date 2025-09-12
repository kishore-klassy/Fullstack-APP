
import React from 'react';
import Button from '../components/Button';

const PlaceholderPage = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Welcome to the Placeholder Page</h1>
      <Button label="Click Me" />
    </div>
  );
};

export default PlaceholderPage;
