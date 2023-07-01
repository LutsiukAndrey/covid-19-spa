import { useSearchParams } from 'react-router-dom';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQueryParam = (name, value) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(name, value) : params.delete(name);
    setSearchParams(params);
  };

  return { searchParams, updateQueryParam };
};
