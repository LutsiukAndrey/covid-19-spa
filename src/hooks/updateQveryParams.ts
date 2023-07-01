import { useSearchParams } from 'react-router-dom';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQueryParam = (name: string, value: string | null | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(name, value) : params.delete(name);
    setSearchParams(params);
  };

  return { searchParams, updateQueryParam };
};
