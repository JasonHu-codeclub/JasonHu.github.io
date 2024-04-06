import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useQuery() {
    const [search] = useSearchParams();
    const query = useMemo(() => Object.fromEntries(search.entries()), [search]);
    // search.entries : This creates an iterator over [key, value] pairs
    // Object.fromEntries(entries) : convert the iterator to a plain object
    return query;
}
