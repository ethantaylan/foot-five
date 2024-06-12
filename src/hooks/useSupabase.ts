import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export interface SupabaseHook<T> {
  response: T | null;
  loading: boolean;
  error: PostgrestError | null;
  executeFetch: () => Promise<void>;
}

export const useSupabase = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: () => any,
  immediate = true
): SupabaseHook<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const executeFetch = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await query();

    if (error) {
      setError(error);
    } else {
      setResponse(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    immediate && executeFetch();
  }, [immediate]);

  return {
    response,
    loading,
    error,
    executeFetch,
  };
};
