export const fetchResp = (resp) => {
    if (resp.ok) {
        // 200-299
        return resp.json();
    }

    throw new Error("Server error.");
};