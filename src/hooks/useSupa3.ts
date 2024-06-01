import { useState, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";

export interface SupabaseHook<T> {
  response: T | null;
  loading: boolean;
  error: PostgrestError | null;
  executeFetch: () => Promise<void>;
}

export function useSupabase<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: () => any,
  immediate = true
): SupabaseHook<T> {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const executeFetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const request = await query();
      setResponse(request.data);
    } catch (error) {
      const request = await query();
      setError(request.error);
    } finally {
      setLoading(false);
    }
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
}
