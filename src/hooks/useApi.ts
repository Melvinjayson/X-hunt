'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface ApiOptions {
  immediate?: boolean
  dependencies?: any[]
}

/**
 * Custom hook for making API calls with loading and error states
 */
export function useApi<T>(
  url: string,
  options: ApiOptions = { immediate: true }
): ApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const { data: session } = useSession()

  const fetchData = async () => {
    setState((prev: ApiState<T>) => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(session && { Authorization: `Bearer ${session.accessToken}` }),
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const data = await response.json()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  useEffect(() => {
    if (options.immediate) {
      fetchData()
    }
  }, options.dependencies || [])

  return {
    ...state,
    refetch: fetchData,
  }
}

/**
 * Hook for making POST/PUT/DELETE requests
 */
export function useApiMutation<TData, TVariables = any>() {
  const [state, setState] = useState<{
    loading: boolean
    error: string | null
  }>({
    loading: false,
    error: null,
  })

  const { data: session } = useSession()

  const mutate = async (
    url: string,
    variables?: TVariables,
    method: 'POST' | 'PUT' | 'DELETE' = 'POST'
  ): Promise<TData> => {
    setState({ loading: true, error: null })
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(session && { Authorization: `Bearer ${session.accessToken}` }),
        },
        ...(variables && { body: JSON.stringify(variables) }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const data = await response.json()
      setState({ loading: false, error: null })
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setState({ loading: false, error: errorMessage })
      throw error
    }
  }

  return {
    mutate,
    loading: state.loading,
    error: state.error,
  }
}

/**
 * Specific hooks for common API endpoints
 */

// Experiences
export function useExperiences(filters?: {
  category?: string
  location?: string
  limit?: number
}) {
  const queryParams = new URLSearchParams()
  if (filters?.category) queryParams.set('category', filters.category)
  if (filters?.location) queryParams.set('location', filters.location)
  if (filters?.limit) queryParams.set('limit', filters.limit.toString())
  
  const url = `/api/experiences${queryParams.toString() ? `?${queryParams}` : ''}`
  return useApi<any[]>(url, { dependencies: [filters] })
}

export function useExperience(id: string) {
  return useApi<any>(`/api/experiences/${id}`, {
    immediate: !!id,
    dependencies: [id]
  })
}

// User data
export function useUser(id: string) {
  return useApi<any>(`/api/users/${id}`, {
    immediate: !!id,
    dependencies: [id]
  })
}

export function useUserBookings(userId: string) {
  return useApi<any[]>(`/api/bookings?userId=${userId}`, {
    immediate: !!userId,
    dependencies: [userId]
  })
}

export function useUserRewards(userId: string, type?: string) {
  const queryParams = new URLSearchParams()
  if (type) queryParams.set('type', type)
  
  const url = `/api/users/${userId}/rewards${queryParams.toString() ? `?${queryParams}` : ''}`
  return useApi<any[]>(url, {
    immediate: !!userId,
    dependencies: [userId, type]
  })
}

export function useUserChallenges(userId: string, status?: string) {
  const queryParams = new URLSearchParams()
  if (status) queryParams.set('status', status)
  
  const url = `/api/users/${userId}/challenges${queryParams.toString() ? `?${queryParams}` : ''}`
  return useApi<any>(url, {
    immediate: !!userId,
    dependencies: [userId, status]
  })
}

// Challenges
export function useChallenges(filters?: {
  status?: string
  difficulty?: string
  limit?: number
}) {
  const queryParams = new URLSearchParams()
  if (filters?.status) queryParams.set('status', filters.status)
  if (filters?.difficulty) queryParams.set('difficulty', filters.difficulty)
  if (filters?.limit) queryParams.set('limit', filters.limit.toString())
  
  const url = `/api/challenges${queryParams.toString() ? `?${queryParams}` : ''}`
  return useApi<any[]>(url, { dependencies: [filters] })
}

// Host data
export function useHostBookings(hostId: string) {
  return useApi<any[]>(`/api/bookings?hostId=${hostId}`, {
    immediate: !!hostId,
    dependencies: [hostId]
  })
}

// Mutations
export function useCreateBooking() {
  return useApiMutation<any, any>()
}

export function useUpdateUser() {
  return useApiMutation<any, any>()
}

export function useCreateExperience() {
  return useApiMutation<any, any>()
}

export function useUpdateExperience() {
  return useApiMutation<any, any>()
}

export function useJoinChallenge() {
  return useApiMutation<any, any>()
}
