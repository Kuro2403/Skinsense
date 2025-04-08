const token = sessionStorage.getItem('authorKey');
export const jwt = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};
