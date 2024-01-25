import HELPERS from "@/Utils/helpers"

const baseURL = "https://api.github.com/"

export const API_MANAGER = {
    getRepos: (params) => {
        return HELPERS.request({
            baseURL,
            url: "search/repositories",
            method: "GET",
            params,
            headers: {
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }
        })
    },
}