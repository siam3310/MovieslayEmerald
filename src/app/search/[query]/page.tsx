"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '../../components/PageLayout';

interface SearchProps {
    params: Promise<{ query: string }>;
}

function SearchPage({ params }: SearchProps) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        params.then(({ query }) => {
            setQuery(query);
        });
    }, []);
    return (
        <PageLayout>
            <h1>Search Results for: {query}</h1>
            {/* Add your search results component or logic here */}
        </PageLayout>
    );
};

export default SearchPage;