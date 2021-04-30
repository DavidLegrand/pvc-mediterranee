import { useState, useCallback } from 'react'
import axios from 'axios'


const api = axios.create({
  responseType: "json",
  headers: { common: { "Content-Type": "application/json" } },
});

const useFetch = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const doFetch = useCallback(
    async (url, options = null) => {
      setLoading(true)
      setError(null)
      try {
        const res = await api.request({ url, ...options })
        setData(res.data)
      } catch (e) {
        const error = e.response.data || e.request || e.message
        setError(error)
      }
      setLoading(false)
    }, [])

  return [doFetch, data, error, loading]
}

export default useFetch