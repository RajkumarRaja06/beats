import { useEffect } from 'react';

const useDocTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - Beats`;
    } else {
      document.title = 'Beats | The Perfect Audio Store';
    }
  }, [title]);

  return null;
};

export default useDocTitle;
