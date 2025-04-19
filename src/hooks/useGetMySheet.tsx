"use client";

import { fetchUserMySheet } from "@/app/api/routes/api/api";
import { useQuery } from "@tanstack/react-query";

export const useGetUserMySheet = (uid: string) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [`users - ${uid}`, uid],
        queryFn: () => fetchUserMySheet(uid),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, isError, error };
};