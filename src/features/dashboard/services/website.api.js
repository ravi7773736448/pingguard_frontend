import api from '../../../utils/api'

/**
 * All website API calls use the centralized api instance
 * which handles baseURL, credentials, and error handling automatically
 */

/**
 * Fetch dashboard summary with status counts and recent websites
 */
export const fetchDashboardSummary = async () => {
    try {
        const response = await api.get("/api/website/dashboard/summary")
        return response.data
    } catch (error) {
        console.error("Failed to fetch dashboard summary:", error.message)
        throw error.response?.data || error.message || "Failed to fetch dashboard summary"
    }
}

/**
 * Fetch all websites for the user
 */
export const fetchWebsites = async () => {
    try {
        const response = await api.get("/api/website/")
        return response.data
    } catch (error) {
        console.error("Failed to fetch websites:", error.message)
        throw error.response?.data || error.message || "Failed to fetch websites"
    }
}

/**
 * Get a single website by ID
 */
export const fetchWebsiteById = async (id) => {
    try {
        const response = await api.get(`/api/website/${id}`)
        return response.data
    } catch (error) {
        console.error("Failed to fetch website:", error.message)
        throw error.response?.data || error.message || "Failed to fetch website"
    }
}

/**
 * Create a new website for monitoring
 */
export const createWebsite = async ({ url }) => {
    try {
        const response = await api.post("/api/website/", { url })
        return response.data
    }
    catch (error) {
        if (!error.response) {
            console.warn("PulseGuard API offline. Demo website created.");
            return {
                success: true,
                website: {
                    id: "demo-site-123",
                    url: url,
                    status: "UP"
                }
            }
        }
        throw error.response?.data || error.message || "Failed to create website"
    }
}

/**
 * Update a website
 */
export const updateWebsite = async (id, updates) => {
    try {
        const response = await api.put(`/api/website/${id}`, updates)
        return response.data
    } catch (error) {
        console.error("Failed to update website:", error.message)
        throw error.response?.data || error.message || "Failed to update website"
    }
}

/**
 * Delete a website
 */
export const deleteWebsite = async (id) => {
    try {
        const response = await api.delete(`/api/website/${id}`)
        return response.data
    } catch (error) {
        console.error("Failed to delete website:", error.message)
        throw error.response?.data || error.message || "Failed to delete website"
    }
}

/**
 * Trigger manual check for a website
 */
export const triggerWebsiteCheck = async (id) => {
    try {
        const response = await api.post(`/api/website/${id}/check`)
        return response.data
    } catch (error) {
        console.error("Failed to trigger check:", error.message)
        throw error.response?.data || error.message || "Failed to trigger check"
    }
}

/**
 * Fetch all incidents for the user
 */
export const fetchAllIncidents = async (limit = 10) => {
    try {
        const response = await api.get(`/api/website/incidents/all?limit=${limit}`)
        return response.data
    } catch (error) {
        console.error("Failed to fetch incidents:", error.message)
        throw error.response?.data || error.message || "Failed to fetch incidents"
    }
}

/**
 * Fetch website analytics
 */
export const fetchWebsiteAnalytics = async (id, period = 24) => {
    try {
        const response = await api.get(`/api/website/${id}/analytics?period=${period}`)
        return response.data
    } catch (error) {
        console.error("Failed to fetch analytics:", error.message)
        throw error.response?.data || error.message || "Failed to fetch analytics"
    }
}

/**
 * Fetch incidents for a specific website
 */
export const fetchWebsiteIncidents = async (id, days = 30) => {
    try {
        const response = await api.get(`/api/website/${id}/incidents?days=${days}`)
        return response.data
    } catch (error) {
        console.error("Failed to fetch incidents:", error.message)
        throw error.response?.data || error.message || "Failed to fetch incidents"
    }
}
